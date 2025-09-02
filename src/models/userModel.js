const bcrypt = require('bcryptjs');

// In-memory store for demo purposes only
const users = [];

async function create({ email, password }) {
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) throw new Error('User already exists');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: String(users.length + 1), email, passwordHash };
  users.push(user);
  return { id: user.id, email: user.email };
}

async function verify({ email, password }) {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, email: user.email };
}

function getPublic(user) {
  if (!user) return null;
  return { id: user.id, email: user.email };
}

module.exports = { create, verify, getPublic, __store: users };
