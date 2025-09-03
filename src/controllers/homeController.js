const messageModel = require('../models/messageModel');

module.exports = {
  index: (req, res) => {
    const pageTitle = 'Home';
    res.render('home', { title: pageTitle, intro: 'Welcome to FreshBasket.' });
  },

  messages: (req, res) => {
    const items = messageModel.list();
    res.json({ data: items });
  },

  dashboard: (req, res) => {
    return res.redirect('/riders');
  },
};
