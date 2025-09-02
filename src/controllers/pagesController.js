module.exports = {
  orders: (req, res) => res.render('sections/orders', { title: 'Orders' }),
  riders: (req, res) => res.render('sections/riders', { title: 'Riders' }),
  customers: (req, res) => res.render('sections/customers', { title: 'Customers' }),
  reports: (req, res) => res.render('sections/reports', { title: 'Reports' }),
};
