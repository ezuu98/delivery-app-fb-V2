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
    const pageTitle = 'Dashboard';
    const riderModel = require('../models/riderModel');
    const riders = riderModel.list();
    res.render('dashboard', { title: pageTitle, riders });
  },
};
