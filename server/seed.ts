import type {
  ActivityEvent,
  AuditEntry,
  CheckAttempt,
  Course,
  Database,
  Enrollment,
  LessonProgress,
  OfficeHour,
  Thread,
  UserRecord,
} from '../shared/types';
import { flattenLessons } from '../shared/analytics';
import { hashPassword, initials } from './auth';
import { DB_VERSION, uid } from './db';
import { buildAiFluencyCourse } from './content/aiFluencyCourse';
import { buildPromptContextCourse } from './content/promptContextCourse';

/** Demo sign-in passwords (one per role). Change them from the profile menu after first sign-in. */
export const DEMO_PASSWORDS = {
  learner: 'Learner@2026',
  instructor: 'Instructor@2026',
  admin: 'Admin@2026',
};

const DAY = 86_400_000;

export function seedDatabase(): Database {
  const now = Date.now();
  const at = (daysAgo: number, hour = 9, minute = 0) => {
    const d = new Date(now - daysAgo * DAY);
    d.setHours(hour, minute, 0, 0);
    // never create timestamps in the future
    return new Date(Math.min(d.getTime(), now - 60_000)).toISOString();
  };

  const mkUser = (id: string, name: string, email: string, role: UserRecord['role'], pw: string, extra: Partial<UserRecord> = {}): UserRecord => ({
    id,
    name,
    email,
    role,
    initials: initials(name),
    active: true,
    createdAt: at(21),
    onboarded: role !== 'learner',
    mustChangePassword: false,
    ...hashPassword(pw),
    ...extra,
  });

  const users: UserRecord[] = [
    mkUser('u_admin', 'Program Administrator', 'admin@usaii.org', 'admin', DEMO_PASSWORDS.admin),
    mkUser('u_instructor', 'Dr. Patricia Okonkwo', 'instructor@usaii.org', 'instructor', DEMO_PASSWORDS.instructor),
    mkUser('u_alex', 'Alex Rivera', 'alex.rivera@enterprise.com', 'learner', DEMO_PASSWORDS.learner, {
      goal: { statement: 'Use AI to cut my weekly reporting time in half', why: 'I spend every Monday morning on status reports.', minutesPerDay: 30, daysPerWeek: 5 },
      learnMode: 'read',
      onboarded: true,
    }),
    mkUser('u_jordan', 'Jordan Lee', 'jordan.lee@enterprise.com', 'learner', DEMO_PASSWORDS.learner),
    mkUser('u_morgan', 'Morgan Chen', 'morgan.chen@enterprise.com', 'learner', DEMO_PASSWORDS.learner, {
      goal: { statement: 'Plan projects faster with AI without missing risks', why: 'I lead carrier onboarding and planning takes days.', minutesPerDay: 30, daysPerWeek: 4 },
      learnMode: 'do',
      onboarded: true,
    }),
  ];

  const courses: Course[] = [
    buildAiFluencyCourse('u_instructor', at(30)),
    buildPromptContextCourse('u_instructor', at(30)),
  ];
  const [fluency, context] = courses;

  /* ------------ progress helpers ------------ */
  const attempt = (daysAgo: number, score: number, qCount: number, kind: CheckAttempt['kind'] = 'check'): CheckAttempt => {
    const correct = Math.round((score / 100) * qCount);
    return { at: at(daysAgo, 10, 20), score: Math.round((correct / qCount) * 100), answers: Array.from({ length: qCount }, () => -1), kind };
  };

  const done = (course: Course, lessonId: string, daysAgo: number, scores: number[], opts: { conf?: number; reflection?: string } = {}): LessonProgress => {
    const f = flattenLessons(course).find((x) => x.lesson.id === lessonId)!;
    const qn = f.lesson.check.length;
    const activity = f.lesson.activity
      ? {
          fields: Object.fromEntries(f.lesson.activity.fields.map((fl) => [fl.id, `My sanitized work example for "${fl.label}".`])),
          submittedAt: at(daysAgo, 10, 40),
        }
      : undefined;
    return {
      status: 'done',
      startedAt: at(daysAgo + 0.2, 9, 0),
      completedAt: at(daysAgo, 10, 45),
      activeSeconds: f.lesson.estimatedMinutes * 60,
      attempts: qn ? scores.map((s, i) => attempt(daysAgo - i * 0.01, s, qn)) : [],
      activity,
      selfConfidence: opts.conf,
      reflection: opts.reflection,
    };
  };
  const started = (daysAgo: number, minutes: number): LessonProgress => ({
    status: 'in_progress',
    startedAt: at(daysAgo, 9, 0),
    activeSeconds: minutes * 60,
    attempts: [],
  });

  // Access is granted a few hours before the learner's first lesson (realistic self-start data).
  const enrolledFor = (lessons: Record<string, LessonProgress>) => {
    const first = Object.values(lessons).map((l) => l.startedAt).filter((x): x is string => !!x).sort()[0];
    return first ? new Date(Date.parse(first) - 5 * 3_600_000).toISOString() : at(3);
  };
  const enroll = (userId: string, courseId: string, lessons: Record<string, LessonProgress>, extra: Partial<Enrollment> = {}): Enrollment => ({
    id: uid('enr'),
    userId,
    courseId,
    enrolledAt: enrolledFor(lessons),
    grantedBy: 'u_instructor',
    lessons,
    ...extra,
  });

  const target = (daysAhead: number) => new Date(now + daysAhead * DAY).toISOString().slice(0, 10);

  const enrollments: Enrollment[] = [
    enroll('u_alex', fluency.id, {
      'af-d1': done(fluency, 'af-d1', 6, [100], { conf: 4, reflection: 'Sorting tasks first saved me time. Next time I will sort before opening any AI tool.' }),
      'af-d2': done(fluency, 'af-d2', 5, [67, 100], { conf: 4 }),
      'af-d3': done(fluency, 'af-d3', 3, [100], { conf: 5 }),
      'af-d4': started(0, 18),
    }, { targetDate: target(14) }),
    enroll('u_alex', context.id, {
      'pc-d1': done(context, 'pc-d1', 4, [100], { conf: 4 }),
      'pc-d2': done(context, 'pc-d2', 4, [67], { conf: 4 }),
    }),
    enroll('u_jordan', fluency.id, {
      'af-d1': done(fluency, 'af-d1', 9, [33], { conf: 5 }),
      'af-d2': started(7, 8),
    }, { targetDate: target(6), enrolledAt: at(12.5) }),
    enroll('u_jordan', context.id, {}),
    enroll('u_morgan', fluency.id, {
      'af-d1': done(fluency, 'af-d1', 11, [100], { conf: 3 }),
      'af-d2': done(fluency, 'af-d2', 9, [100], { conf: 4 }),
      'af-d3': done(fluency, 'af-d3', 7, [67, 67], { conf: 4 }),
      'af-d4': done(fluency, 'af-d4', 4, [33, 67], { conf: 3 }),
      'af-d5': started(1, 22),
    }, { targetDate: target(21) }),
    enroll('u_morgan', context.id, {
      'pc-d1': done(context, 'pc-d1', 5, [67], { conf: 3 }),
      'pc-d2': done(context, 'pc-d2', 5, [60], { conf: 4 }),
    }),
  ];

  /* ------------ activity history ------------ */
  const events: ActivityEvent[] = [];
  const addDay = (userId: string, courseId: string, daysAgo: number, minutes: number, hour = 8) => {
    events.push({ id: uid('ev'), userId, type: 'login', at: at(daysAgo, hour, 0) });
    const chunks = Math.max(1, Math.round(minutes / 5));
    for (let i = 0; i < chunks; i++) {
      events.push({ id: uid('ev'), userId, courseId, type: 'study', at: at(daysAgo, hour, 2 + i * 5), seconds: Math.round((minutes * 60) / chunks) });
    }
  };
  // Alex: 6 of the last 7 days, ~30 min.
  [13, 12, 10, 9, 6, 5, 4, 3, 2, 1, 0].forEach((d, i) => addDay('u_alex', i % 3 === 2 ? context.id : fluency.id, d, [28, 32, 25, 34, 30, 27, 35, 31, 29, 33, 18][i], 8));
  // Jordan: two short sessions, then quiet.
  addDay('u_jordan', fluency.id, 9, 12, 19);
  addDay('u_jordan', fluency.id, 7, 8, 21);
  // Morgan: about 4 days a week.
  [13, 11, 10, 9, 7, 5, 4, 2, 1].forEach((d, i) => addDay('u_morgan', i % 4 === 3 ? context.id : fluency.id, d, [30, 34, 26, 31, 36, 29, 33, 27, 22][i], 17));
  // Checks / activity / posts events (participation history)
  for (const e of enrollments) {
    for (const p of Object.values(e.lessons)) {
      for (const a of p.attempts) events.push({ id: uid('ev'), userId: e.userId, courseId: e.courseId, type: 'check', at: a.at });
      if (p.activity) events.push({ id: uid('ev'), userId: e.userId, courseId: e.courseId, type: 'activity', at: p.activity.submittedAt });
    }
  }

  /* ------------ community & support ------------ */
  const threads: Thread[] = [
    {
      id: 'th_1',
      courseId: fluency.id,
      lessonId: 'af-d3',
      lessonTitle: 'Day 3: Writing useful prompts',
      authorId: 'u_alex',
      authorName: 'Alex Rivera',
      authorRole: 'learner',
      audience: 'everyone',
      title: 'Should constraints go at the top or the end of a prompt?',
      body: 'When I use the four-element prompt, is it better to put the constraints first or last?',
      createdAt: at(3, 9, 10),
      likes: ['u_morgan'],
      replies: [
        { id: 'rp_1', authorId: 'u_instructor', authorName: 'Dr. Patricia Okonkwo', authorRole: 'instructor', text: 'Either works, but placing constraints clearly at the end tends to keep length, tone, and format rules front of mind for the tool. Try both on your own task and compare.', createdAt: at(3, 9, 35), likes: ['u_alex', 'u_morgan'] },
      ],
      readBy: ['u_alex'],
    },
    {
      id: 'th_2',
      courseId: fluency.id,
      lessonId: 'af-d2',
      lessonTitle: 'Day 2: Common workplace AI use cases',
      authorId: 'u_jordan',
      authorName: 'Jordan Lee',
      authorRole: 'learner',
      audience: 'everyone',
      title: 'Can I use a personal task instead of a work task?',
      body: 'I do not have many writing tasks at work. Can I pick something from my personal life?',
      createdAt: at(8, 20, 0),
      likes: [],
      replies: [
        { id: 'rp_2', authorId: 'u_instructor', authorName: 'Dr. Patricia Okonkwo', authorRole: 'instructor', text: 'Yes. Pick any task you repeat often, such as planning meals or organizing volunteer schedules. What matters is that you will use it again.', createdAt: at(8, 21, 0), likes: ['u_jordan'] },
      ],
      readBy: ['u_jordan'],
    },
    {
      id: 'th_3',
      courseId: fluency.id,
      lessonId: 'af-d5',
      lessonTitle: 'Day 5: Using AI for planning and analysis',
      authorId: 'u_morgan',
      authorName: 'Morgan Chen',
      authorRole: 'learner',
      audience: 'instructor',
      title: 'How much detail should my onboarding plan include?',
      body: 'My carrier onboarding plan has 14 steps. Is that too many for the planning template?',
      createdAt: at(1, 18, 0),
      likes: [],
      replies: [
        { id: 'rp_3', authorId: 'u_instructor', authorName: 'Dr. Patricia Okonkwo', authorRole: 'instructor', text: 'Group the 14 steps into 3 or 4 phases first, then ask the tool to flag missing risks per phase. It will be much easier to check.', createdAt: at(0, 8, 0), likes: [] },
      ],
      readBy: [],
    },
    {
      id: 'th_4',
      courseId: context.id,
      lessonId: 'sl-m2-l1',
      lessonTitle: 'Finding and prioritizing AI value',
      authorId: 'u_alex',
      authorName: 'Alex Rivera',
      authorRole: 'learner',
      audience: 'everyone',
      title: 'How do you score feasibility when data quality is unknown?',
      body: 'For one of my opportunities, nobody knows how clean the data is. Should I rate feasibility low by default?',
      createdAt: at(0, 7, 30),
      likes: [],
      replies: [],
      readBy: [],
    },
  ];

  const oh = (id: string, courseId: string, title: string, daysFromNow: number, hour: number, extra: Partial<OfficeHour> = {}): OfficeHour => {
    const d = new Date(now + daysFromNow * DAY);
    d.setHours(hour, 0, 0, 0);
    return { id, courseId, title, host: 'Dr. Patricia Okonkwo', startsAt: d.toISOString(), durationMin: 45, joinUrl: 'https://meet.jit.si/usaii-office-hours', registered: [], attended: [], ...extra };
  };
  const officeHours: OfficeHour[] = [
    oh('oh_1', 'all', 'Getting started: your first week', -10, 17, { registered: ['u_alex', 'u_morgan', 'u_jordan'], attended: ['u_alex', 'u_morgan'] }),
    oh('oh_2', fluency.id, 'Prompt clinic: bring your Day 3 prompt', -3, 17, { registered: ['u_alex', 'u_morgan'], attended: ['u_alex', 'u_morgan'] }),
    oh('oh_3', fluency.id, 'Planning workflows Q&A', 1, 17, { registered: ['u_morgan'] }),
    oh('oh_4', context.id, 'Leading AI strategy conversations', 4, 12),
  ];

  const audit: AuditEntry[] = [
    { id: uid('au'), at: at(16, 9), actorId: 'u_instructor', actorName: 'Dr. Patricia Okonkwo', role: 'instructor', action: 'GRANT_ACCESS', details: 'Granted Fall cohort access to AI Productivity Micro-Credential and CAIC-SL™ Part 1.' },
    { id: uid('au'), at: at(21, 9), actorId: 'u_admin', actorName: 'Program Administrator', role: 'admin', action: 'PUBLISH_COURSE', details: 'Published AI Basics for Everyone (free).' },
  ];

  return {
    version: DB_VERSION,
    users,
    courses,
    enrollments,
    events,
    threads,
    officeHours,
    notifications: [
      { id: uid('nt'), userId: 'u_morgan', kind: 'reply', title: 'Dr. Okonkwo answered your question', body: 'How much detail should my onboarding plan include?', createdAt: at(0, 8, 0), read: false, link: { view: 'ask', courseId: fluency.id, threadId: 'th_3' } },
      { id: uid('nt'), userId: 'u_alex', kind: 'access', title: 'New course access', body: 'You now have access to CAIC-SL™ Part 1: Strategic Leadership Foundations.', createdAt: at(16, 9), read: true, link: { view: 'learning', courseId: context.id } },
      { id: uid('nt'), userId: 'u_instructor', kind: 'message', title: 'New question from Alex Rivera', body: 'How do you score feasibility when data quality is unknown?', createdAt: at(0, 7, 30), read: false, link: { view: 'inbox', threadId: 'th_4' } },
    ],
    messages: [],
    feedback: [
      { id: uid('fb'), userId: 'u_alex', recommend: true, ease: 5, comment: 'I always know what to do next. The what-if planner is motivating.', createdAt: at(2) },
      { id: uid('fb'), userId: 'u_morgan', recommend: true, ease: 4, comment: 'Seeing my weak topics helps me focus.', createdAt: at(4) },
    ],
    audit,
  };
}
