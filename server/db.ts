// Lightweight persistent JSON database with atomic, debounced writes.
// Swappable for PostgreSQL later: all access goes through `db()` and `save()`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Database } from '../shared/types';

export const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, 'data');
export const UPLOAD_DIR = path.join(ROOT, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');
export const DB_VERSION = 4;

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

let state: Database | null = null;
let timer: NodeJS.Timeout | null = null;

export function uid(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}

export const nowIso = () => new Date().toISOString();

export function loadDb(seed: () => Database): Database {
  if (fs.existsSync(DB_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) as Database;
      if (parsed.version === DB_VERSION) {
        state = parsed;
        return state;
      }
      console.log('[db] Data format changed. Re-seeding demo data.');
    } catch (e) {
      const backup = DB_FILE + `.corrupt-${Date.now()}`;
      fs.copyFileSync(DB_FILE, backup);
      console.warn(`[db] Could not read database. Backup saved to ${backup}. Re-seeding.`);
    }
  }
  state = seed();
  flush();
  return state;
}

export function replaceDb(next: Database) {
  state = next;
  flush();
}

export function db(): Database {
  if (!state) throw new Error('Database not loaded');
  return state;
}

export function save() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(flush, 150);
}

export function flush() {
  if (!state) return;
  timer = null;
  const data = JSON.stringify(state);
  const tmp = DB_FILE + '.tmp';
  try {
    fs.writeFileSync(tmp, data);
    fs.renameSync(tmp, DB_FILE);
  } catch {
    // Some Windows setups (antivirus / file indexers) briefly lock files; fall back to a direct write.
    fs.writeFileSync(DB_FILE, data);
  }
}

process.on('exit', flush);
for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.on(sig, () => {
    flush();
    process.exit(0);
  });
}
