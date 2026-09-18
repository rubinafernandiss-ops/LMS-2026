import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import { exec } from 'node:child_process';
import { loadDb, ROOT, UPLOAD_DIR } from './db';
import { seedDatabase, DEMO_PASSWORDS } from './seed';
import { authRouter } from './routes/auth';
import { learnerRouter } from './routes/learner';
import { communityRouter, publicRouter } from './routes/community';
import { staffRouter } from './routes/staff';
import { adminRouter } from './routes/admin';
import { uploadRouter } from './routes/uploads';

// 4600 keeps this app away from port 3000, where older prototypes usually run.
const BASE_PORT = Number(process.env.PORT) || 4600;
const APP_ID = 'usaii-intuitive-lms';
const isProd = process.env.NODE_ENV === 'production';

async function main() {
  loadDb(seedDatabase);
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '5mb' }));
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    next();
  });

  app.get('/api/health', (_req, res) => res.json({ app: APP_ID, status: 'ok', version: '4.9.2', time: new Date().toISOString() }));
  app.use('/api/auth', authRouter);
  app.use('/api/learner', learnerRouter);
  app.use('/api/public', publicRouter);
  app.use('/api/staff', staffRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/uploads', uploadRouter);
  app.use('/api', communityRouter);
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

  app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d', fallthrough: false }));

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[error]', err);
    if (!res.headersSent) res.status(500).json({ error: 'Something went wrong on our side. Please try again.' });
  });

  const server = http.createServer(app);

  if (!isProd) {
    const { createServer } = await import('vite');
    // Live-reload runs over this same server/port, so it never collides with another app.
    const vite = await createServer({ server: { middlewareMode: true, hmr: { server } }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const dist = path.join(ROOT, 'dist');
    if (!fs.existsSync(dist)) {
      console.error('Build not found. Run "npm run build" first.');
      process.exit(1);
    }
    app.use(express.static(dist));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  // On a hosting platform the port is assigned and must be used exactly as given;
  // only on a local machine do we hunt for the next free port.
  const fixedPort = !!process.env.PORT;
  const port = fixedPort ? await listenOnPort(server, BASE_PORT) : await listenOnFreePort(server, BASE_PORT);
  const url = `http://localhost:${port}`;
  console.log('');
  console.log('  ==============================================');
  console.log('   USAII Intuitive LMS 4.9.2 is running');
  console.log(`   Open ${url}`);
  console.log('  ==============================================');
  if (port !== BASE_PORT) console.log(`   (Port ${BASE_PORT} was busy, so ${port} is used instead.)`);
  console.log('');
  console.log('   Sign-in passwords');
  console.log(`     Learner        alex.rivera@enterprise.com   ${DEMO_PASSWORDS.learner}`);
  console.log(`     Instructor     instructor@usaii.org         ${DEMO_PASSWORDS.instructor}`);
  console.log(`     Administrator  admin@usaii.org              ${DEMO_PASSWORDS.admin}`);
  console.log('');
  console.log('   Keep this window open while you use the LMS. Close it to stop.');
  console.log('');
  if (process.env.OPEN_BROWSER === '1') openBrowser(url);
}

function listenOnPort(server: http.Server, port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '0.0.0.0', () => resolve(port));
  });
}

function listenOnFreePort(server: http.Server, start: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let port = start;
    const tryPort = () => {
      server.once('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE' && port < start + 20) {
          port += 1;
          tryPort();
        } else reject(err);
      });
      server.listen(port, () => resolve(port));
    };
    tryPort();
  });
}

function openBrowser(url: string) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => undefined);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
