const userModel = require('../models/userModel');

module.exports = {
  showLogin: (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('auth/login', { title: 'Login', error: null, email: '' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.verify({ email, password });
      if (!user) return res.status(401).render('auth/login', { title: 'Login', error: 'Invalid credentials', email });
      req.session.user = user;
      return res.redirect('/dashboard');
    } catch (err) {
      return res.status(500).render('auth/login', { title: 'Login', error: 'Unexpected error', email });
    }
  },

  showRegister: (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('auth/register', { title: 'Register', error: null, email: '' });
  },

  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.create({ email, password });
      req.session.user = user;
      return res.redirect('/dashboard');
    } catch (err) {
      const msg = err && err.message ? err.message : 'Unexpected error';
      return res.status(400).render('auth/register', { title: 'Register', error: msg, email });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  },
};
