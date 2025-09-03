const { listOrders, isConfigured } = require('../services/shopify');

module.exports = {
  orders: async (req, res) => {
    const { orders, error, configured } = await listOrders({ limit: 25 });
    return res.render('sections/orders', { title: 'Orders', orders, shopifyError: error, shopifyConfigured: configured && isConfigured() });
  },
  riders: (req, res) => {
    const riderModel = require('../models/riderModel');
    const riders = riderModel.list();
    return res.render('dashboard', { title: 'Rider Commissions', riders });
  },
  customers: (req, res) => res.render('sections/customers', { title: 'Customers' }),
  reports: (req, res) => res.render('sections/reports', { title: 'Reports' }),
};
