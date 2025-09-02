const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { SESSION_COOKIE_NAME } = require('../middleware/currentUser');

function getClientConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY || null,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || null,
    projectId: process.env.FIREBASE_PROJECT_ID || null,
    appId: process.env.FIREBASE_APP_ID || null,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || null,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || null,
  };
}

module.exports = {
  showLogin: (req, res) => {
    res.render('auth/login', { title: 'Login', error: null, email: '', firebaseConfig: getClientConfig(), hideHeader: true });
  },
  showRegister: (req, res) => {
    res.render('auth/register', { title: 'Register', error: null, email: '', firebaseConfig: getClientConfig(), hideHeader: true });
  },
  sessionLogin: async (req, res) => {
    try {
      const admin = initFirebaseAdmin();
      if (!admin) return res.status(500).json({ error: 'Firebase Admin not configured' });
      const { idToken } = req.body;
      if (!idToken) return res.status(400).json({ error: 'Missing idToken' });
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
