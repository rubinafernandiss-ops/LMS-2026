import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { NextFunction, Request, Response } from 'express';
import type { PublicUser, Role, UserRecord } from '../shared/types';
import { DATA_DIR, db } from './db';

const SECRET_FILE = path.join(DATA_DIR, 'secret.key');
const SECRET =
  process.env.AUTH_SECRET ||
  (() => {
    if (fs.existsSync(SECRET_FILE)) return fs.readFileSync(SECRET_FILE, 'utf8').trim();
    const s = crypto.randomBytes(48).toString('hex');
    fs.writeFileSync(SECRET_FILE, s);
    return s;
  })();

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
  const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { passwordHash, salt };
}

export function verifyPassword(password: string, user: UserRecord): boolean {
  const { passwordHash } = hashPassword(password, user.salt);
  const a = Buffer.from(passwordHash, 'hex');
  const b = Buffer.from(user.passwordHash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function validatePassword(pw: unknown): string | null {
  if (typeof pw !== 'string' || pw.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return 'Password must include letters and numbers.';
  return null;
}

export function tempPassword(): string {
  const words = ['Learn', 'Grow', 'Spark', 'Bright', 'Focus', 'Rise'];
  return `${words[crypto.randomInt(words.length)]}-${crypto.randomInt(1000, 9999)}-${crypto.randomBytes(2).toString('hex')}`;
}

const b64 = (s: string) => Buffer.from(s).toString('base64url');
const sign = (s: string) => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');

export function issueToken(userId: string): string {
  const payload = b64(JSON.stringify({ uid: userId, exp: Date.now() + TOKEN_TTL_MS }));
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string): string | null {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (expected.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (typeof uid !== 'string' || Date.now() > exp) return null;
    return uid;
  } catch {
    return null;
  }
}

export function toPublic(u: UserRecord): PublicUser {
  const { passwordHash: _h, salt: _s, ...rest } = u;
  return rest;
}

export function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w) && !/^(dr|mr|mrs|ms)\.?$/i.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || name.slice(0, 2).toUpperCase()
  );
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const userId = token ? readToken(token) : null;
  const user = userId ? db().users.find((u) => u.id === userId) : undefined;
  if (!user || !user.active) return res.status(401).json({ error: 'Your session has ended. Please sign in again.' });
  req.user = user;
  next();
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ error: 'You do not have access to this area.' });
    next();
  };
}

// Simple brute-force protection for sign-in.
const failures = new Map<string, { count: number; until: number }>();
export function loginLocked(email: string): number {
  const f = failures.get(email);
  if (f && f.until > Date.now()) return Math.ceil((f.until - Date.now()) / 1000);
  return 0;
}
export function recordFailure(email: string) {
  const f = failures.get(email) ?? { count: 0, until: 0 };
  f.count += 1;
  if (f.count >= 5) {
    f.until = Date.now() + 60_000;
    f.count = 0;
  }
  failures.set(email, f);
}
export function clearFailures(email: string) {
  failures.delete(email);
}
