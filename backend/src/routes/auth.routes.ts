import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { createUser, findUserByEmail } from '../utils/userStore';
import { signToken, verifyToken } from '../utils/jwt';

export const authRouter = Router();

const newId = () => {
  const anyCrypto: any = crypto as any;
  if (typeof anyCrypto.randomUUID === 'function') return anyCrypto.randomUUID();
  return crypto.randomBytes(16).toString('hex');
};

const getBearerToken = (req: Request) => {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return null;
  return token;
};

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'User already exists. Please sign in.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = newId();

    createUser({
      id,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    });

    const token = signToken({ sub: id, email });
    return res.status(201).json({ token, user: { id, email } });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to create user account.' });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = findUserByEmail(email);
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed due to a server error.' });
  }
});

authRouter.get('/me', (req: Request, res: Response) => {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ message: 'Missing Authorization header.' });

  try {
    const payload = verifyToken(token);
    return res.json({ user: { id: payload.sub, email: payload.email } });
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
});
