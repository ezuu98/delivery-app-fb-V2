const admin = require('firebase-admin');

const admin = require('firebase-admin');
let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return admin;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  const privateKeyB64 = process.env.FIREBASE_PRIVATE_KEY_BASE64 || '';
  if (privateKeyB64 && !privateKey) {
    try { privateKey = Buffer.from(privateKeyB64, 'base64').toString('utf8'); } catch (_) { /* ignore */ }
  }
  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\\r/g, '').trim();
    if ((privateKey.startsWith('"') && privateKey.endsWith('"')) || (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
      privateKey = privateKey.slice(1, -1);
    }
  }

  if (!projectId || !clientEmail || !privateKey) {
    // Do not throw to allow app to start; protected routes will fail with 401
    // eslint-disable-next-line no-console
    console.warn('Firebase Admin not fully configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
    initialized = true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to initialize Firebase Admin:', err && err.message ? err.message : err);
    return null;
  }
  return admin;
}

module.exports = { initFirebaseAdmin };
