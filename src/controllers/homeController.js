const messageModel = require('../models/messageModel');
const path = require('path');

module.exports = {
  index: (req, res) => {
    const pageTitle = 'Home';
    res.render('home', { title: pageTitle, intro: 'Welcome to FreshBasket.' });
  },

  messages: (req, res) => {
    const items = messageModel.list();
    res.json({ data: items });
  },

  // Serve SPA dashboard (avoid redirect loop)
  dashboard: (req, res) => {
    return res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
  },
};
