import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByEmail, createUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = '1h';

export async function register(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const existing = findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ email, passwordHash });
  return res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const user = findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return res.json({ token, user: { id: user.id, email: user.email } });
}
