const cookieParser = require('cookie-parser');
const { initFirebaseAdmin } = require('../services/firebaseAdmin');

const SESSION_COOKIE_NAME = '__session';

function currentUserMiddleware() {
  const parser = cookieParser();
  return [
    parser,
    async (req, res, next) => {
      const admin = initFirebaseAdmin();
      req.user = null;
      if (!admin) return next();
      const sessionCookie = req.cookies && req.cookies[SESSION_COOKIE_NAME];
      if (!sessionCookie) return next();
      try {
        const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
        req.user = { uid: decoded.uid, email: decoded.email || null, claims: decoded };
      } catch (_) {
        // ignore invalid/expired cookie
      }
      return next();
    },
  ];
}

module.exports = { currentUserMiddleware, SESSION_COOKIE_NAME };
