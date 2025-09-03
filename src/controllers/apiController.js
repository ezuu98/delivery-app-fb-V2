const riderModel = require('../models/riderModel');
const { listOrders, isConfigured } = require('../services/shopify');
const orderModel = require('../models/orderModel');
const riderModel = require('../models/riderModel');
const { ok, fail } = require('../utils/response');
const log = require('../utils/logger');

module.exports = {
  riders: async (req, res) => {
    const riders = riderModel.list();
    return res.json(ok({ riders }));
  },
  riderProfile: async (req, res) => {
    const rider = riderModel.getById(req.params.id);
    if (!rider) return res.status(404).json(fail('Not Found'));

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

    return res.json(ok({ rider, metrics: { totalDeliveries, avgDeliveryMins, onTimeRate, totalKm: rider.totalKm }, history }));
  },
  orders: async (req, res) => {
    try{
      let cached = orderModel.getAll();
      if (!cached.length) {
        const { orders = [], error } = await listOrders({ limit: 50 });
        if (error) log.warn('orders.fetch.error', { error });
        orderModel.upsertMany(orders);
        cached = orderModel.getAll();
      }
      const withAssignments = cached.map(o=> ({
        ...o,
        assignment: orderModel.getAssignment(String(o.id) || String(o.name) || String(o.order_number)) || null,
      }));
      return res.json(ok({ orders: withAssignments, shopifyError: null, shopifyConfigured: isConfigured() }));
    }catch(e){
      log.error('orders.list.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load orders'));
    }
  },
  reports: async (req, res) => {
    const riders = riderModel.list();
    const orders = orderModel.getAll();
    const totalDeliveries = orders.length;
    const avgDeliveryMins = riders.length ? Math.round(riders.reduce((a, r) => a + (60 - (r.performance / 100) * 30), 0) / riders.length) : 0;
    return res.json(ok({ metrics: { totalDeliveries, avgDeliveryMins }, orders }));
  },

  getOrder: async (req, res) => {
    const id = String(req.params.id);
    const order = orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    return res.json(ok({ order: { ...order, assignment: orderModel.getAssignment(id) || null } }));
  },

  assignOrder: async (req, res) => {
    const id = String(req.params.id);
    const { riderId } = req.body || {};
    const rider = riderModel.getById(riderId);
    if (!rider) return res.status(400).json(fail('Invalid rider'));
    const order = orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const assignment = orderModel.assign(id, riderId);
    log.info('order.assigned', { orderId: id, riderId });
    return res.json(ok({ assignment }));
  },

  unassignOrder: async (req, res) => {
    const id = String(req.params.id);
    const order = orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    orderModel.unassign(id);
    log.info('order.unassigned', { orderId: id });
    return res.json(ok({ ok: true }));
  },
};
