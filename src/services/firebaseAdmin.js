const admin = require('firebase-admin');
const log = require('../utils/logger');
let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return admin;
  const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim();
  const clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || '').trim();

  // Prefer BASE64 if provided (more reliable on hosts that mangle newlines)
  const privateKeyB64Raw = process.env.FIREBASE_PRIVATE_KEY_BASE64 || '';
  let privateKey = '';
  if (privateKeyB64Raw) {
    try {
      const privateKeyB64 = String(privateKeyB64Raw).trim().replace(/\s+/g, '');
      privateKey = Buffer.from(privateKeyB64, 'base64').toString('utf8');
    } catch (e) {
      log.warn('firebaseAdmin.base64.decodeFailed', { message: e && e.message });
    }
  }
  if (!privateKey) {
    privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  }
  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\\r/g, '').trim();
    if ((privateKey.startsWith('"') && privateKey.endsWith('"')) || (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
      privateKey = privateKey.slice(1, -1);
    }
  }

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [];
    if (!projectId) missing.push('FIREBASE_PROJECT_ID');
    if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
    if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY[_BASE64]');
    log.warn('firebaseAdmin.config.missing', { missing });
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
    initialized = true;
  } catch (err) {
    log.warn('firebaseAdmin.init.failed', { message: err && err.message ? err.message : String(err) });
    return null;
  }
  return admin;
}

module.exports = { initFirebaseAdmin };
