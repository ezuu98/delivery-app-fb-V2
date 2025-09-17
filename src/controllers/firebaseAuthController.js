const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { getFirestore } = require('../services/firestore');
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

      // Relax cookie flags on insecure (local) HTTP to avoid browsers dropping the cookie
      const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase();
      const isSecure = !!(req.secure || proto === 'https');
      const cookieParts = [
        `${SESSION_COOKIE_NAME}=${sessionCookie}`,
        `Max-Age=${Math.floor(expiresIn / 1000)}`,
        'Path=/',
        'HttpOnly',
      ];

      // Scope cookie to parent domain when applicable (handles www/apex changes)
      const host = (req.hostname || '').toLowerCase();
      const isIp = /^((\d{1,3}\.){3}\d{1,3}|\[[0-9a-f:]+\])$/.test(host) || host === 'localhost';
      if (!isIp && host.includes('.')) {
        const parts = host.split('.');
        if (parts.length >= 2) cookieParts.push(`Domain=.${parts.slice(-2).join('.')}`);
      }

      if (isSecure) {
        cookieParts.push('Secure', 'SameSite=None');
        if (String(process.env.COOKIE_PARTITIONED || '').trim() === '1') cookieParts.push('Partitioned');
      } else {
        cookieParts.push('SameSite=Lax');
      }
      const { ok } = require('../utils/response');
      res.setHeader('Set-Cookie', cookieParts.join('; '));
      return res.status(200).json(ok());
    } catch (e) {
      return res.status(401).json({ error: 'Invalid ID token' });
    }
  },
  logout: async (req, res) => {
    try {
      const expired = 'Thu, 01 Jan 1970 00:00:00 GMT';
      const base = [`${SESSION_COOKIE_NAME}=`, `Expires=${expired}`, 'Max-Age=0', 'Path=/', 'HttpOnly', 'Secure', 'SameSite=None'];

      const host = (req.hostname || '').toLowerCase();
      const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host === 'localhost';
      let domain = null;
      if (!isIp && host.includes('.')) {
        const parts = host.split('.');
        if (parts.length >= 2) domain = '.' + parts.slice(-2).join('.');
      }

      const variants = [];
      // Host-only cookies (with and without Partitioned)
      variants.push([...base, 'Partitioned'].join('; '));
      variants.push(base.join('; '));
      // Domain-scoped cookies if available (with and without Partitioned)
      if (domain) {
        variants.push([...base, `Domain=${domain}`, 'Partitioned'].join('; '));
        variants.push([...base, `Domain=${domain}`].join('; '));
      }

      res.setHeader('Set-Cookie', variants);
    } catch (_) { /* ignore */ }
    return res.redirect('/');
  },
};
