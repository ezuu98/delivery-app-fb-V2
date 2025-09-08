const cookieParser = require('cookie-parser');
const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const log = require('../utils/logger');

const SESSION_COOKIE_NAME = '__session';

function currentUserMiddleware() {
  const parser = cookieParser();
  return [
    parser,
    async (req, res, next) => {
      const admin = initFirebaseAdmin();
      req.user = null;
      if (!admin) {
        log.warn('currentUser.noAdmin');
        return next();
      }

      const sessionCookie = req.cookies && req.cookies[SESSION_COOKIE_NAME];
      const authHeader = req.headers && req.headers.authorization;

      if (!sessionCookie && !authHeader) {
        log.info('currentUser.noToken');
        return next();
      }

      // Try session cookie first (created via createSessionCookie)
      if (sessionCookie) {
        try {
          const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
          req.user = { uid: decoded.uid, email: decoded.email || null, claims: decoded };
          log.info('currentUser.verifiedSession');
          return next();
        } catch (e) {
          log.warn('currentUser.verifySession.failed', { message: e && e.message });
          // fallthrough to try as idToken
        }
      }

      // If Authorization header present, try Bearer idToken
      if (authHeader && String(authHeader || '').toLowerCase().startsWith('bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const decoded = await admin.auth().verifyIdToken(token);
          req.user = { uid: decoded.uid, email: decoded.email || null, claims: decoded };
          log.info('currentUser.verifiedIdToken.header');
          return next();
        } catch (e) {
          log.warn('currentUser.verifyIdToken.header.failed', { message: e && e.message });
        }
      }

      // Finally, try treating sessionCookie as an ID token (common mistake)
      if (sessionCookie) {
        try {
          const decoded = await admin.auth().verifyIdToken(sessionCookie);
          req.user = { uid: decoded.uid, email: decoded.email || null, claims: decoded };
          log.info('currentUser.verifiedIdToken.cookie');
          return next();
        } catch (e) {
          log.warn('currentUser.verifyIdToken.cookie.failed', { message: e && e.message });
        }
      }

      return next();
    },
  ];
}

module.exports = { currentUserMiddleware, SESSION_COOKIE_NAME };
