const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { getFirestore } = require('../services/firestore');
const { SESSION_COOKIE_NAME } = require('../middleware/currentUser');

function getClientConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || null,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || null,
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || null,
    appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || null,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || null,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID || null,
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
      // Write/update rider profile in Firestore keyed by Firebase UID for mobile access
      try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded && decoded.uid;
        if (uid) {
          const db = getFirestore();
          if (db) {
            const docRef = db.collection('riders').doc(uid);
            const now = new Date().toISOString();
            const payload = { uid, updatedAt: now };
            const displayNameFromProfile = profile && profile.fullName ? String(profile.fullName).trim().slice(0,120) : undefined;
            const contactFromProfile = profile && profile.contactNumber ? String(profile.contactNumber).trim().slice(0,40) : undefined;
            if (decoded.email !== undefined) payload.email = decoded.email || null;
            if (displayNameFromProfile !== undefined) payload.displayName = displayNameFromProfile;
            else if (decoded.name !== undefined) payload.displayName = decoded.name || null;
            if (contactFromProfile !== undefined) payload.contactNumber = contactFromProfile;
            else if (decoded.contactNumber !== undefined) payload.contactNumber = decoded.contactNumber || null;
            if (decoded.picture !== undefined) payload.photoURL = decoded.picture || null;
            const snap = await docRef.get();
            if (!snap.exists) payload.createdAt = now;
            await docRef.set(payload, { merge: true });
          }
        }
      } catch (_) { /* ignore firestore write errors */ }

      // Always set Secure + SameSite=None + Partitioned to support third-party iframe previews
      const cookieParts = [
        `${SESSION_COOKIE_NAME}=${sessionCookie}`,
        `Max-Age=${Math.floor(expiresIn / 1000)}`,
        'Path=/',
        'HttpOnly',
        'Secure',
        'SameSite=None',
        'Partitioned',
      ];
      res.setHeader('Set-Cookie', cookieParts.join('; '));
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
