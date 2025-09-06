function ensureAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.redirect('/auth/login');
}

const { fail } = require('../utils/response');

function ensureAuthenticatedJson(req, res, next) {
  if (req.user) return next();
  return res.status(401).json(fail('Unauthorized'));
}

module.exports = { ensureAuthenticated, ensureAuthenticatedJson };
