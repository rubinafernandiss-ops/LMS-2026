import { Router } from 'express';
import type { Course, UserRecord } from '../../shared/types';
import { dateKey, flattenLessons } from '../../shared/analytics';
import { hashPassword, initials, requireAuth, requireRole, toPublic, validatePassword } from '../auth';
import { db, nowIso, save, uid } from '../db';
import { audit, fail, getCourse, getEnrollment, notify, snapshotFor, validateCourse } from '../services';
import { me, wrap } from './util';

export const staffRouter = Router();
staffRouter.use(requireAuth, requireRole('instructor', 'admin'));

/** Instructors manage the courses they created; the administrator manages every course. */
export const canManage = (actor: UserRecord, c: Course) => actor.role === 'admin' || c.createdBy === actor.id;
const myCourses = (actor: UserRecord) => db().courses.filter((c) => canManage(actor, c));
function manageableCourse(actor: UserRecord, id: string): Course {
  const c = getCourse(id);
  if (!canManage(actor, c)) fail(403, 'You can only manage courses you created.');
  return c;
}
const busiestCourseId = (actor: UserRecord) => {
  const d = db();
  return [...myCourses(actor)].sort((a, b) => d.enrollments.filter((e) => e.courseId === b.id).length - d.enrollments.filter((e) => e.courseId === a.id).length)[0]?.id ?? '';
};
const learners = () => db().users.filter((u) => u.role === 'learner');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function learnerCard(u: UserRecord, course: Course) {
  const s = snapshotFor(u, course);
  const enr = getEnrollment(u.id, course.id)!;
  const flat = flattenLessons(course);
  return {
    user: toPublic(u),
    enrolledAt: enr.enrolledAt,
    targetDate: enr.targetDate,
    passConfidence: s.prediction.passConfidence,
    predictedGrade: s.prediction.predictedGrade,
    predictedLetter: s.prediction.predictedLetter,
    currentGrade: s.prediction.currentGrade,
    avgCheck: s.prediction.avgCheckScore,
    comprehension: s.prediction.comprehension,
    activitiesDone: s.engagement.activitiesSubmitted,
    activitiesTotal: flat.filter((f) => f.lesson.activity).length,
    studyDays: s.engagement.activeDaysLast7,
    loginDays: s.engagement.loginDaysLast7,
    avgSession: s.engagement.avgSessionMinutes,
    activeMinutes7: s.engagement.activeMinutesLast7,
    engagement: s.engagement.engagementScore,
    attendanceRate: s.engagement.attendanceRate,
    completion: s.completion,
    modules: course.modules.map((m) => {
      const ls = m.lessons;
      const done = ls.filter((l) => enr.lessons[l.id]?.status === 'done').length;
      return { id: m.id, title: m.title, percent: ls.length ? Math.round((done / ls.length) * 100) : 0 };
    }),
    weakAreas: s.weakAreas.slice(0, 3).map((w) => ({ topic: w.topic, score: w.score })),
    risk: s.risk,
    nextStep: s.nextStep.title,
    credential: !!enr.certificateIssuedAt,
    // When this learner was last seen anywhere in the portal, for the inactive list.
    lastActiveAt: db().events.filter((e) => e.userId === u.id).reduce((m, e) => (e.at > m ? e.at : m), ''),
    guidance: enr.guidance,
  };
}

/* ---------------- Cohort ---------------- */

staffRouter.get(
  '/cohort',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    const courses = myCourses(actor).filter((c) => c.status === 'published' || d.enrollments.some((e) => e.courseId === c.id));
    const busiest = [...courses].sort((a, b) => d.enrollments.filter((e) => e.courseId === b.id).length - d.enrollments.filter((e) => e.courseId === a.id).length)[0];
    const courseId = typeof req.query.courseId === 'string' && req.query.courseId ? req.query.courseId : busiest?.id;
    if (!courseId) return { courses: [], cards: [], stats: null };
    const course = manageableCourse(actor, courseId);
    const cards = d.enrollments
      .filter((e) => e.courseId === course.id)
      .map((e) => d.users.find((u) => u.id === e.userId && u.role === 'learner' && u.active))
      .filter((u): u is UserRecord => !!u)
      .map((u) => learnerCard(u, course))
      .sort((a, b) => Number(b.risk.needsSupport) - Number(a.risk.needsSupport) || a.passConfidence - b.passConfidence);
    const avg = (xs: (number | null)[]) => {
      const v = xs.filter((x): x is number => x !== null);
      return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
    };
    const pendingQuestions = d.threads.filter((t) => t.courseId === course.id && !t.replies.some((r) => r.authorRole !== 'learner')).length;
    return {
      courses: courses.map((c) => ({ id: c.id, title: c.title, status: c.status })),
      course: { id: course.id, title: course.title, passMark: course.passMark },
      cards,
      stats: {
        total: cards.length,
        needsSupport: cards.filter((c) => c.risk.needsSupport).length,
        avgConfidence: avg(cards.map((c) => c.passConfidence)),
        avgCheck: avg(cards.map((c) => c.avgCheck)),
        avgCompletion: avg(cards.map((c) => c.completion.percent)),
        avgEngagement: avg(cards.map((c) => c.engagement)),
        credentials: cards.filter((c) => c.credential).length,
        pendingQuestions,
      },
    };
  }),
);

staffRouter.get(
  '/learner/:userId',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    const u = d.users.find((x) => x.id === req.params.userId && x.role === 'learner') ?? fail(404, 'Learner not found.');
    const items = d.enrollments
      .filter((e) => e.userId === u!.id)
      .map((e) => d.courses.find((c) => c.id === e.courseId))
      .filter((c): c is Course => !!c && canManage(actor, c))
      .map((c) => ({ course: c, enrollment: getEnrollment(u!.id, c.id)!, snapshot: snapshotFor(u!, c) }));
    const threads = d.threads.filter((t) => t.authorId === u!.id);
    const messages = d.messages.filter((m) => m.toId === u!.id);
    const officeHours = d.officeHours.filter((o) => o.courseId === 'all' || items.some((i) => i.course.id === o.courseId));
    return { user: toPublic(u!), items, threads, messages, officeHours };
  }),
);

/* ---------------- Learners & access ---------------- */

staffRouter.get(
  '/learners',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    const mine = new Set(myCourses(actor).map((c) => c.id));
    return {
      learners: learners().map((u) => ({
        user: toPublic(u),
        courses: d.enrollments
          .filter((e) => e.userId === u.id && mine.has(e.courseId))
          .map((e) => {
            const c = d.courses.find((x) => x.id === e.courseId);
            const total = c ? flattenLessons(c).length : 0;
            const done = Object.values(e.lessons).filter((p) => p.status === 'done').length;
            return { courseId: e.courseId, title: c?.title ?? 'Removed course', percent: total ? Math.round((done / total) * 100) : 0, credential: !!e.certificateIssuedAt };
          }),
        lastActive: d.events.filter((e) => e.userId === u.id).reduce((m, e) => (e.at > m ? e.at : m), ''),
      })),
      courses: myCourses(actor).map((c) => ({ id: c.id, title: c.title, status: c.status })),
    };
  }),
);

staffRouter.post(
  '/learners',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const name = String(req.body?.name ?? '').trim().slice(0, 100);
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const courseIds: string[] = Array.isArray(req.body?.courseIds) ? req.body.courseIds.map(String) : [];
    if (!EMAIL_RE.test(email)) fail(400, 'Enter a valid email address.');
    let user = d.users.find((u) => u.email.toLowerCase() === email);
    const created = !user;
    if (user && user.role !== 'learner') fail(409, 'That email belongs to a staff account.');
    const courses = courseIds.map((cid) => manageableCourse(actor, cid));
    if (!user) {
      if (name.length < 2) fail(400, 'Enter the learner\'s name.');
      const password = String(req.body?.password ?? '');
      const pwErr = validatePassword(password);
      if (pwErr) fail(400, pwErr);
      user = { id: uid('u'), name, email, role: 'learner', initials: initials(name), active: true, createdAt: nowIso(), onboarded: false, mustChangePassword: false, ...hashPassword(password) };
      d.users.push(user);
      audit(actor, 'ADD_LEARNER', `Added learner ${name} (${email}).`);
    }
    const granted: string[] = [];
    for (const c of courses) {
      if (!getEnrollment(user.id, c.id)) {
        d.enrollments.push({ id: uid('enr'), userId: user.id, courseId: c.id, enrolledAt: nowIso(), grantedBy: actor.id, lessons: {} });
        granted.push(c.title);
        notify(user.id, { kind: 'access', title: 'New course access', body: `${actor.name} gave you access to ${c.title}.`, link: { view: 'dashboard', courseId: c.id } });
      }
    }
    if (granted.length) audit(actor, 'GRANT_ACCESS', `Granted ${user.name} access to: ${granted.join(', ')}.`);
    save();
    return { user: toPublic(user), created, granted };
  }),
);

staffRouter.post(
  '/access',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const user = d.users.find((u) => u.id === req.body?.userId && u.role === 'learner') ?? fail(404, 'Learner not found.');
    const c = manageableCourse(actor, String(req.body?.courseId));
    const grant = req.body?.grant !== false;
    const existing = getEnrollment(user!.id, c.id);
    if (grant && !existing) {
      d.enrollments.push({ id: uid('enr'), userId: user!.id, courseId: c.id, enrolledAt: nowIso(), grantedBy: actor.id, lessons: {} });
      notify(user!.id, { kind: 'access', title: 'New course access', body: `${actor.name} gave you access to ${c.title}.`, link: { view: 'dashboard', courseId: c.id } });
      audit(actor, 'GRANT_ACCESS', `Granted ${user!.name} access to ${c.title}.`);
    } else if (!grant && existing) {
      d.enrollments = d.enrollments.filter((e) => e !== existing);
      audit(actor, 'REVOKE_ACCESS', `Removed ${user!.name} from ${c.title}.`);
    }
    save();
    return { ok: true };
  }),
);

staffRouter.post(
  '/learners/:userId/password',
  wrap((req) => {
    const actor = me(req);
    const user = db().users.find((u) => u.id === req.params.userId && u.role === 'learner') ?? fail(404, 'Learner not found.');
    const password = String(req.body?.password ?? '');
    const pwErr = validatePassword(password);
    if (pwErr) fail(400, pwErr);
    Object.assign(user!, hashPassword(password), { mustChangePassword: false });
    audit(actor, 'SET_PASSWORD', `Set a new password for ${user!.name}.`);
    save();
    return { ok: true };
  }),
);

/* ---------------- Personalized guidance ---------------- */

staffRouter.post(
  '/guidance',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const courseId = String(req.body?.courseId ?? '');
    const course = manageableCourse(actor, courseId);
    const learner = d.users.find((u) => u.id === String(req.body?.userId ?? '') && u.role === 'learner') ?? fail(404, 'Learner not found.');
    const enr = getEnrollment(learner!.id, course.id) ?? fail(404, 'This learner is not enrolled in the course.');
    const nextStep = String(req.body?.nextStep ?? '').trim().slice(0, 600);
    const workOn = String(req.body?.workOn ?? '').trim().slice(0, 600);
    if (!nextStep && !workOn) fail(400, 'Write at least one line of guidance.');
    enr!.guidance = { nextStep, workOn, byName: actor.name, byId: actor.id, updatedAt: nowIso() };
    notify(learner!.id, {
      kind: 'message',
      title: `${actor.name} shared guidance for you`,
      body: nextStep || workOn,
      link: { view: 'dashboard', courseId: course.id },
    });
    audit(actor, 'GUIDANCE', `Gave guidance to ${learner!.name} on ${course.title}.`);
    save();
    return { guidance: enr!.guidance };
  }),
);

/* ---------------- Messaging & feedback ---------------- */

staffRouter.post(
  '/message',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const to = d.users.find((u) => u.id === req.body?.toId) ?? fail(404, 'Recipient not found.');
    const subject = String(req.body?.subject ?? '').trim().slice(0, 200) || 'A note from your instructor';
    const body = String(req.body?.body ?? '').trim().slice(0, 5000);
    if (body.length < 2) fail(400, 'Write a message first.');
    const msg = { id: uid('msg'), fromId: actor.id, fromName: actor.name, toId: to!.id, subject, body, createdAt: nowIso() };
    d.messages.unshift(msg);
    notify(to!.id, { kind: 'message', title: `Message from ${actor.name}: ${subject}`, body: body.slice(0, 160), link: { view: 'messages' } });
    audit(actor, 'MESSAGE_LEARNER', `Sent "${subject}" to ${to!.name}.`);
    save();
    return { message: msg };
  }),
);

staffRouter.post(
  '/activity-feedback',
  wrap((req) => {
    const actor = me(req);
    const { userId, courseId, lessonId } = req.body ?? {};
    const enr = getEnrollment(String(userId), String(courseId)) ?? fail(404, 'Enrollment not found.');
    const p = enr!.lessons[String(lessonId)];
    if (!p?.activity) fail(404, 'No submission found.');
    const feedback = String(req.body?.feedback ?? '').trim().slice(0, 5000);
    if (feedback.length < 2) fail(400, 'Write feedback first.');
    p!.activity!.feedback = feedback;
    p!.activity!.feedbackBy = actor.name;
    p!.activity!.feedbackAt = nowIso();
    const course = manageableCourse(actor, String(courseId));
    const lesson = flattenLessons(course).find((f) => f.lesson.id === lessonId)?.lesson;
    notify(String(userId), { kind: 'feedback', title: `Feedback on your activity`, body: `${actor.name} reviewed "${lesson?.activity?.title ?? lesson?.title}".`, link: { view: 'study', courseId: course.id, lessonId: String(lessonId) } });
    save();
    return { ok: true };
  }),
);

/* ---------------- Assessments ---------------- */

staffRouter.get(
  '/assessments',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    const course = manageableCourse(actor, String(req.query.courseId || busiestCourseId(actor)));
    const enrs = d.enrollments.filter((e) => e.courseId === course.id);
    const nameOf = (id: string) => d.users.find((u) => u.id === id)?.name ?? 'Unknown';
    const emailOf = (id: string) => d.users.find((u) => u.id === id)?.email ?? '';
    const lessons = flattenLessons(course).map((f) => {
      const attempts = enrs.flatMap((e) => (e.lessons[f.lesson.id]?.attempts ?? []).filter((a) => a.kind === 'check'));
      const firsts = enrs.map((e) => e.lessons[f.lesson.id]?.attempts.find((a) => a.kind === 'check')).filter(Boolean) as { score: number; answers: number[] }[];
      const bests = enrs
        .map((e) => (e.lessons[f.lesson.id]?.attempts ?? []).filter((a) => a.kind === 'check').map((a) => a.score))
        .filter((xs) => xs.length)
        .map((xs) => Math.max(...xs));
      const questions = f.lesson.check.map((q, qi) => {
        const answered = firsts.filter((a) => a.answers[qi] !== undefined && a.answers[qi] >= 0);
        const correct = answered.filter((a) => a.answers[qi] === q.correctIndex).length;
        return { id: q.id, question: q.question, answered: answered.length, percentCorrect: answered.length ? Math.round((correct / answered.length) * 100) : null };
      });
      return {
        lessonId: f.lesson.id,
        title: f.lesson.title,
        moduleTitle: f.module.title,
        mode: f.lesson.checkSettings.mode,
        questionCount: f.lesson.check.length,
        learnersAttempted: firsts.length,
        attempts: attempts.length,
        avgFirst: firsts.length ? Math.round(firsts.reduce((a, b) => a + b.score, 0) / firsts.length) : null,
        avgBest: bests.length ? Math.round(bests.reduce((a, b) => a + b, 0) / bests.length) : null,
        questions,
      };
    });
    const submissions = enrs.flatMap((e) =>
      flattenLessons(course)
        .filter((f) => e.lessons[f.lesson.id]?.activity)
        .map((f) => ({
          userId: e.userId,
          learnerName: nameOf(e.userId),
          learnerEmail: emailOf(e.userId),
          lessonId: f.lesson.id,
          lessonTitle: f.lesson.title,
          activityTitle: f.lesson.activity?.title ?? '',
          fieldLabels: Object.fromEntries((f.lesson.activity?.fields ?? []).map((x) => [x.id, x.label])),
          submission: e.lessons[f.lesson.id]!.activity!,
        })),
    ).sort((a, b) => b.submission.submittedAt.localeCompare(a.submission.submittedAt));
    const finals = enrs
      .filter((e) => e.finalExam?.attempts.length)
      .map((e) => ({ learnerName: nameOf(e.userId), attempts: e.finalExam!.attempts.map((a) => ({ at: a.at, score: a.score })), passed: e.finalExam!.attempts.some((a) => a.score >= course.passMark) }));
    return { course: { id: course.id, title: course.title, passMark: course.passMark }, courses: myCourses(actor).map((c) => ({ id: c.id, title: c.title })), lessons, submissions, finals };
  }),
);

/* ---------------- Activity metrics ---------------- */

staffRouter.get(
  '/activity',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    const cid = String(req.query.courseId || busiestCourseId(actor));
    if (!cid) return { course: null, courses: [], rows: [], days: [] };
    const course = manageableCourse(actor, cid);
    const ids = new Set(d.enrollments.filter((e) => e.courseId === course.id).map((e) => e.userId));
    const people = d.users.filter((u) => ids.has(u.id) && u.role === 'learner');
    const rows = people.map((u) => {
      const s = snapshotFor(u, course);
      return { userId: u.id, name: u.name, initials: u.initials, engagement: s.engagement };
    });
    const now = Date.now();
    const days: { date: string; minutes: number; logins: number; activeLearners: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const k = dateKey(now - i * 86_400_000);
      let minutes = 0;
      let logins = 0;
      let activeLearners = 0;
      for (const r of rows) {
        const day = r.engagement.daily.find((x) => x.date === k);
        if (day) {
          minutes += day.minutes;
          if (day.login) logins += 1;
          if (day.minutes > 0) activeLearners += 1;
        }
      }
      days.push({ date: k, minutes, logins, activeLearners });
    }
    return { course: { id: course.id, title: course.title }, courses: myCourses(actor).map((c) => ({ id: c.id, title: c.title })), rows, days };
  }),
);

/* ---------------- Course builder ---------------- */

staffRouter.get(
  '/courses',
  wrap((req) => {
    const d = db();
    const actor = me(req);
    return {
      courses: myCourses(actor).map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle,
        status: c.status,
        accent: c.accent,
        ...(actor.role === 'admin' ? { price: c.price } : {}),
        modules: c.modules.length,
        lessons: flattenLessons(c).length,
        learners: d.enrollments.filter((e) => e.courseId === c.id).length,
        createdBy: d.users.find((u) => u.id === c.createdBy)?.name ?? 'Unknown',
        createdById: c.createdBy,
        updatedAt: c.updatedAt,
      })),
    };
  }),
);

staffRouter.get('/courses/:id', wrap((req) => ({ course: manageableCourse(me(req), req.params.id) })));

staffRouter.post(
  '/courses',
  wrap((req) => {
    const actor = me(req);
    const course = validateCourse(req.body ?? {}, undefined, actor);
    db().courses.push(course);
    audit(actor, 'CREATE_COURSE', `Created course "${course.title}".`);
    save();
    return { course };
  }),
);

staffRouter.put(
  '/courses/:id',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const existing = manageableCourse(actor, req.params.id);
    const updated = validateCourse(req.body ?? {}, existing, actor);
    d.courses = d.courses.map((c) => (c.id === existing.id ? updated : c));
    audit(actor, 'UPDATE_COURSE', `Updated course "${updated.title}".`);
    save();
    return { course: updated };
  }),
);

staffRouter.post(
  '/courses/:id/status',
  wrap((req) => {
    const actor = me(req);
    const c = manageableCourse(actor, req.params.id);
    const status = req.body?.status === 'published' ? 'published' : 'draft';
    if (status === 'published' && !flattenLessons(c).length) fail(400, 'Add at least one lesson before publishing.');
    c.status = status;
    c.updatedAt = nowIso();
    audit(actor, status === 'published' ? 'PUBLISH_COURSE' : 'UNPUBLISH_COURSE', `${status === 'published' ? 'Published' : 'Unpublished'} "${c.title}".`);
    save();
    return { course: c };
  }),
);

staffRouter.post(
  '/courses/:id/duplicate',
  wrap((req) => {
    const actor = me(req);
    const c = manageableCourse(actor, req.params.id);
    const copy = validateCourse({ ...JSON.parse(JSON.stringify(c)), title: `${c.title} (copy)` }, undefined, actor);
    // fresh ids for modules and lessons so progress never collides
    copy.modules = copy.modules.map((m) => ({ ...m, id: uid('m'), lessons: m.lessons.map((l) => ({ ...l, id: uid('l') })) }));
    db().courses.push(copy);
    audit(actor, 'DUPLICATE_COURSE', `Duplicated "${c.title}".`);
    save();
    return { course: copy };
  }),
);

staffRouter.delete(
  '/courses/:id',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const c = getCourse(req.params.id);
    const enrolled = d.enrollments.filter((e) => e.courseId === c.id).length;
    if (actor.role !== 'admin') {
      if (c.createdBy !== actor.id) fail(403, 'Only the administrator can delete courses created by others.');
      if (enrolled) fail(400, 'This course has learners. Unpublish it instead, or ask the administrator.');
    }
    d.courses = d.courses.filter((x) => x.id !== c.id);
    d.enrollments = d.enrollments.filter((e) => e.courseId !== c.id);
    d.threads = d.threads.filter((t) => t.courseId !== c.id);
    audit(actor, 'DELETE_COURSE', `Deleted "${c.title}" (${enrolled} enrollments removed).`);
    save();
    return { ok: true };
  }),
);
