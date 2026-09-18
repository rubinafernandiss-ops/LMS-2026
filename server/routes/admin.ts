import { Router } from 'express';
import type { UserRecord } from '../../shared/types';
import { hashPassword, initials, requireAuth, requireRole, toPublic, validatePassword } from '../auth';
import { db, nowIso, replaceDb, save, uid } from '../db';
import { seedDatabase } from '../seed';
import { audit, fail } from '../services';
import { me, wrap } from './util';

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole('admin'));

adminRouter.get(
  '/overview',
  wrap(() => {
    const d = db();
    const learnerIds = new Set(d.users.filter((u) => u.role === 'learner').map((u) => u.id));
    const enrs = d.enrollments.filter((e) => learnerIds.has(e.userId));
    const started = enrs.filter((e) => Object.values(e.lessons).some((p) => p.status !== 'not_started'));
    const completed = enrs.filter((e) => e.certificateIssuedAt);
    // A learner can rate several things (each course, plus the portal itself), so
    // count people, not entries: one learner is one voice, using their latest rating.
    const answers = d.feedback.filter((f) => learnerIds.has(f.userId));
    const latestOf = (list: typeof answers) => {
      const m = new Map<string, (typeof answers)[number]>();
      for (const f of list) {
        const held = m.get(f.userId);
        if (!held || Date.parse(f.createdAt) > Date.parse(held.createdAt)) m.set(f.userId, f);
      }
      return [...m.values()];
    };
    // "Would you recommend USAII® courses?" is its own Yes/No question. Where a
    // learner has answered it, that is their answer; otherwise their star rating
    // stands in for it (four stars or more counts as a yes).
    const votes = latestOf(answers.filter((f) => f.kind === 'recommend'));
    const voted = new Set(votes.map((f) => f.userId));
    const rated = latestOf(answers.filter((f) => f.kind !== 'recommend'));
    const voices = [...votes, ...rated.filter((f) => !voted.has(f.userId))];
    // Ease comes from star ratings only: a Yes/No vote carries no score.
    const ease = rated.length ? Math.round((rated.reduce((a, f) => a + f.ease, 0) / rated.length) * 10) / 10 : null;
    // Started without assistance: first lesson opened within 36 hours of getting access.
    const selfStarted = started.filter((e) => {
      const first = Object.values(e.lessons).map((p) => p.startedAt).filter(Boolean).sort()[0];
      return first && Date.parse(first) - Date.parse(e.enrolledAt) < 36 * 3_600_000;
    }).length;
    const pct = (n: number, of: number) => (of ? Math.round((n / of) * 100) : 0);
    return {
      feedback: {
        recommendYes: voices.filter((f) => f.recommend).length,
        totalLearners: learnerIds.size,
        answered: voices.length,
        ease,
        startedWithoutAssistance: pct(selfStarted, started.length),
      },
      stats: {
        learners: learnerIds.size,
        instructors: d.users.filter((u) => u.role === 'instructor').length,
        publishedCourses: d.courses.filter((c) => c.status === 'published').length,
        totalEnrollments: enrs.length,
        courseStartRate: pct(started.length, enrs.length),
        courseCompletionRate: pct(completed.length, enrs.length),
      },
      comments: answers
        .filter((f) => f.comment)
        .slice(0, 6)
        .map((f) => ({ id: f.id, name: d.users.find((u) => u.id === f.userId)?.name ?? 'Learner', comment: f.comment, recommend: f.recommend, createdAt: f.createdAt })),
      audit: d.audit.slice(0, 50),
    };
  }),
);

adminRouter.get('/users', wrap(() => ({ users: db().users.map(toPublic) })));

adminRouter.post(
  '/users',
  wrap((req) => {
    const actor = me(req);
    const d = db();
    const name = String(req.body?.name ?? '').trim().slice(0, 100);
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const role: 'instructor' | 'learner' | null = req.body?.role === 'instructor' ? 'instructor' : req.body?.role === 'learner' ? 'learner' : null;
    if (!role) fail(400, 'Only instructor or learner accounts can be created. There is a single administrator account.');
    if (name.length < 2) fail(400, 'Enter a name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'Enter a valid email.');
    if (d.users.some((u) => u.email.toLowerCase() === email)) fail(409, 'An account with this email already exists.');
    const password = String(req.body?.password ?? '');
    const pwErr = validatePassword(password);
    if (pwErr) fail(400, pwErr);
    const user: UserRecord = { id: uid('u'), name, email, role: role!, initials: initials(name), active: true, createdAt: nowIso(), onboarded: role !== 'learner', mustChangePassword: false, ...hashPassword(password) };
    d.users.push(user);
    audit(actor, 'CREATE_USER', `Created ${role} account for ${name}.`);
    save();
    return { user: toPublic(user) };
  }),
);

adminRouter.patch(
  '/users/:id',
  wrap((req) => {
    const actor = me(req);
    const u = db().users.find((x) => x.id === req.params.id) ?? fail(404, 'User not found.');
    if (u!.role === 'admin') fail(400, 'The administrator account cannot be changed here.');
    if (typeof req.body?.active === 'boolean') {
      u!.active = req.body.active;
      audit(actor, u!.active ? 'ACTIVATE_USER' : 'DEACTIVATE_USER', `${u!.active ? 'Activated' : 'Deactivated'} ${u!.name}.`);
    }
    save();
    return { user: toPublic(u!) };
  }),
);

adminRouter.post(
  '/users/:id/reset-password',
  wrap((req) => {
    const actor = me(req);
    const u = db().users.find((x) => x.id === req.params.id) ?? fail(404, 'User not found.');
    if (u!.role === 'admin') fail(400, 'Change the administrator password from your profile menu.');
    const password = String(req.body?.password ?? '');
    const pwErr = validatePassword(password);
    if (pwErr) fail(400, pwErr);
    Object.assign(u!, hashPassword(password), { mustChangePassword: false });
    audit(actor, 'SET_PASSWORD', `Set a new password for ${u!.name}.`);
    save();
    return { ok: true };
  }),
);

adminRouter.post(
  '/reset-demo',
  wrap(() => {
    replaceDb(seedDatabase());
    return { ok: true };
  }),
);
