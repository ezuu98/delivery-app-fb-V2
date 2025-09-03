function ensureAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.redirect('/auth/login');
}

function ensureAuthenticatedJson(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { ensureAuthenticated, ensureAuthenticatedJson };
