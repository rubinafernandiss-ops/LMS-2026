import { Router } from 'express';
import {
  clearFailures,
  hashPassword,
  initials,
  issueToken,
  loginLocked,
  recordFailure,
  requireAuth,
  toPublic,
  validatePassword,
  verifyPassword,
} from '../auth';
import { db, save } from '../db';
import { audit, fail, recordEvent } from '../services';
import { me, wrap } from './util';
import type { LearnMode } from '../../shared/types';

export const authRouter = Router();

const normEmail = (e: unknown) => (typeof e === 'string' ? e.trim().toLowerCase() : '');

authRouter.post(
  '/login',
  wrap((req) => {
    const email = normEmail(req.body?.email);
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!email || !password) fail(400, 'Enter your email and password.');
    const wait = loginLocked(email);
    if (wait) fail(429, `Too many attempts. Please wait ${wait} seconds and try again.`);
    const user = db().users.find((u) => u.email.toLowerCase() === email);
    if (!user || !verifyPassword(password, user)) {
      recordFailure(email);
      fail(401, 'That email and password combination did not match.');
    }
    if (!user!.active) fail(403, 'This account has been deactivated. Contact your administrator.');
    clearFailures(email);
    recordEvent(user!.id, 'login');
    return { token: issueToken(user!.id), user: toPublic(user!) };
  }),
);

// Self-registration is intentionally disabled: accounts are created by an instructor or the administrator.

authRouter.get('/me', requireAuth, wrap((req) => ({ user: toPublic(me(req)) })));

authRouter.post(
  '/change-password',
  requireAuth,
  wrap((req) => {
    const u = me(req);
    const { current, next } = req.body ?? {};
    if (!u.mustChangePassword && !verifyPassword(String(current ?? ''), u)) fail(400, 'Your current password is incorrect.');
    const err = validatePassword(next);
    if (err) fail(400, err);
    Object.assign(u, hashPassword(next), { mustChangePassword: false });
    audit(u, 'CHANGE_PASSWORD', 'Password changed.');
    save();
    return { user: toPublic(u) };
  }),
);

authRouter.patch(
  '/profile',
  requireAuth,
  wrap((req) => {
    const u = me(req);
    const b = req.body ?? {};
    if (typeof b.name === 'string' && b.name.trim().length >= 2) {
      u.name = b.name.trim().slice(0, 100);
      u.initials = initials(u.name);
    }
    if (typeof b.onboarded === 'boolean') u.onboarded = b.onboarded;
    if (['read', 'watch', 'listen', 'do'].includes(b.learnMode)) u.learnMode = b.learnMode as LearnMode;
    if (b.goal === null) delete u.goal;
    else if (b.goal && typeof b.goal === 'object') {
      u.goal = {
        statement: String(b.goal.statement ?? '').slice(0, 300),
        why: String(b.goal.why ?? '').slice(0, 500),
        minutesPerDay: Math.max(5, Math.min(240, Number(b.goal.minutesPerDay) || 20)),
        daysPerWeek: Math.max(1, Math.min(7, Number(b.goal.daysPerWeek) || 4)),
      };
    }
    save();
    return { user: toPublic(u) };
  }),
);
