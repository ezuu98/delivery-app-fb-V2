const messageModel = require('../models/messageModel');

module.exports = {
  index: (req, res) => {
    const pageTitle = 'Home';
    res.render('home', { title: pageTitle, intro: 'Welcome to the Delivery App MVC scaffold.' });
  },

  messages: (req, res) => {
    const items = messageModel.list();
    res.json({ data: items });
  },
};
