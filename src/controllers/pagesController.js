module.exports = {
  orders: (req, res) => res.render('sections/orders', { title: 'Orders' }),
  riders: (req, res) => {
    const riderModel = require('../models/riderModel');
    const riders = riderModel.list();
    return res.render('dashboard', { title: 'Rider Commissions', riders });
  },
  customers: (req, res) => res.render('sections/customers', { title: 'Customers' }),
  reports: (req, res) => res.render('sections/reports', { title: 'Reports' }),
};
