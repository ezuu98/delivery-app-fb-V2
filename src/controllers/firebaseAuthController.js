const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { SESSION_COOKIE_NAME } = require('../middleware/currentUser');

function getClientConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
}

module.exports = {
  getClientConfig,
  showLogin: (req, res) => {
    return res.sendFile(require('path').join(__dirname, '..', '..', 'public', 'index.html'));
  },
  showRegister: (req, res) => {
    return res.sendFile(require('path').join(__dirname, '..', '..', 'public', 'index.html'));
  },
  sessionLogin: async (req, res) => {
    try {
      const admin = initFirebaseAdmin();
      if (!admin) return res.status(500).json({ error: 'Firebase Admin not configured' });
      const { idToken, profile } = req.body;
      if (!idToken) return res.status(400).json({ error: 'Missing idToken' });

      // If profile data provided (during registration), update the user
      if (profile && (profile.fullName || profile.contactNumber)) {
        try {
          const decoded = await admin.auth().verifyIdToken(idToken);
          const uid = decoded && decoded.uid;
          if (uid) {
            const updates = {};
            if (profile.fullName && typeof profile.fullName === 'string') {
              const name = profile.fullName.trim().slice(0, 120);
              if (name) updates.displayName = name;
            }
            if (Object.keys(updates).length) await admin.auth().updateUser(uid, updates);
            if (profile.contactNumber && typeof profile.contactNumber === 'string') {
              const phone = profile.contactNumber.trim().slice(0, 40);
              if (phone) await admin.auth().setCustomUserClaims(uid, { contactNumber: phone });
            }
          }
        } catch (_) {
          // ignore profile update errors; do not block session creation
        }
      }

      const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      res.cookie(SESSION_COOKIE_NAME, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(401).json({ error: 'Invalid ID token' });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie(SESSION_COOKIE_NAME);
      return res.redirect('/');
    } catch (_) {
      return res.redirect('/');
    }
  },
};
