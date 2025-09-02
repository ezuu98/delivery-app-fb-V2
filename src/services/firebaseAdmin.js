const admin = require('firebase-admin');

let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return admin;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

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
