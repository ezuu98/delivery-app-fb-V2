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
  riderProfile: (req, res) => {
    const riderModel = require('../models/riderModel');
    const rider = riderModel.getById(req.params.id);
    if (!rider) return res.status(404).render('404', { title: 'Not Found' });

    const totalDeliveries = Math.max(1, Math.round(rider.totalKm * 2));
    const avgDeliveryMins = Math.max(10, Math.round(60 - (rider.performance / 100) * 30));
    const onTimeRate = Math.min(99, Math.max(60, rider.performance + 5));

    const history = Array.from({ length: 10 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const deliveries = Math.max(0, Math.round((rider.performance / 10) + (i % 3) * 2));
      const avg = avgDeliveryMins + ((i % 2) ? 3 : -2);
      const km = Math.max(1, Math.round(deliveries * (3 + (i % 4))));
      return { date: date.toISOString().slice(0, 10), deliveries, avgTime: avg, distanceKm: km };
    }).reverse();

    return res.render('sections/rider-profile', {
      title: 'Rider Profile',
      rider,
      metrics: { totalDeliveries, avgDeliveryMins, onTimeRate, totalKm: rider.totalKm },
      history,
    });
  },
  customers: (req, res) => res.render('sections/customers', { title: 'Customers' }),
  reports: async (req, res) => {
    const riderModel = require('../models/riderModel');
    const riders = riderModel.list();
    const { orders = [] } = await listOrders({ limit: 50 });
    const totalDeliveries = orders.length;
    const avgDeliveryMins = riders.length ? Math.round(riders.reduce((a, r) => a + (60 - (r.performance / 100) * 30), 0) / riders.length) : 0;
    return res.render('sections/reports', { title: 'Reporting & Analytics', metrics: { totalDeliveries, avgDeliveryMins }, orders });
  },
};
