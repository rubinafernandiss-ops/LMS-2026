import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { requireAuth } from '../auth';
import { UPLOAD_DIR } from '../db';

const ALLOWED = /^(video|audio|image)\/|^application\/(pdf|msword|vnd\.openxmlformats-officedocument\.|vnd\.ms-|zip)|^text\/(plain|csv|markdown)/;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '').slice(0, 10);
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1 GB for course videos
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.test(file.mimetype)) cb(null, true);
    else cb(new Error('This file type is not supported. Use video, audio, images, PDF, Office documents, or text.'));
  },
});

export const uploadRouter = Router();

uploadRouter.post('/', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err: unknown) => {
    if (err) {
      const msg = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE' ? 'File is larger than 1 GB.' : (err as Error).message;
      return res.status(400).json({ error: msg });
    }
    const f = req.file;
    if (!f) return res.status(400).json({ error: 'Choose a file to upload.' });
    // Learners may attach files up to 50 MB to activities.
    if (req.user!.role === 'learner' && f.size > 50 * 1024 * 1024) {
      fs.unlink(f.path, () => undefined);
      return res.status(400).json({ error: 'Activity attachments must be 50 MB or smaller.' });
    }
    res.json({ url: `/uploads/${f.filename}`, name: f.originalname, size: f.size, mime: f.mimetype });
  });
});
