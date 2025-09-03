const { listOrders, isConfigured } = require('../services/shopify');
const orderModel = require('../models/orderModel');
const riderModel = require('../models/riderModel');
const { ok, fail } = require('../utils/response');
const log = require('../utils/logger');
const { paginate, parseIntParam } = require('../utils/pagination');

module.exports = {
  riders: async (req, res) => {
    const { q = '', status = 'all', lastDays = 'all', page = '1', limit = '20' } = req.query || {};
    const list = riderModel.list();
    const filtered = list.filter(r => {
      if (q && !String(r.name || '').toLowerCase().includes(String(q).toLowerCase())) return false;
      if (status !== 'all' && String(r.status) !== String(status)) return false;
      if (lastDays !== 'all') {
        const n = parseIntParam(lastDays, 0);
        const last = parseInt(r.lastActiveDays, 10) || 9999;
        if (!(last <= n)) return false;
      }
      return true;
    });
    const p = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));
    return res.json(ok({ riders: p.items }, p.meta));
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
      const { q = '', status = 'all', created_at_min, created_at_max, page = '1', limit = '20' } = req.query || {};
      let cached = await orderModel.getAll();
      if (!cached.length) {
        const { orders = [], error } = await listOrders({ limit: 100 });
        if (error) log.warn('orders.fetch.error', { error });
        await orderModel.upsertMany(orders);
        cached = await orderModel.getAll();
      }
      const ql = String(q).toLowerCase().trim();
      function getOrderStatus(o){
        const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
        const tagStr = tags.join(',').toLowerCase();
        if(tagStr.includes('assigned')) return 'assigned';
        if(o.fulfillment_status === 'fulfilled') return 'delivered';
        if(o.fulfillment_status === 'partial') return 'in-transit';
        return 'new';
      }
      const fromTs = created_at_min ? Date.parse(created_at_min) : null;
      const toTs = created_at_max ? Date.parse(created_at_max) : null;

      const filtered = cached.filter(o => {
        if (status !== 'all' && getOrderStatus(o) !== status) return false;
        if (ql){
          const name = String(o.name || o.order_number || o.id || '').toLowerCase();
          const customer = [o.customer?.first_name||'', o.customer?.last_name||''].join(' ').toLowerCase();
          const addr = [o.shipping_address?.address1||'', o.shipping_address?.city||'', o.shipping_address?.province||'', o.shipping_address?.country||''].join(' ').toLowerCase();
          const text = `${name} ${customer} ${addr}`;
          if(!text.includes(ql)) return false;
        }
        if (fromTs || toTs){
          const t = o.created_at ? Date.parse(o.created_at) : null;
          if (!t) return false;
          if (fromTs && t < fromTs) return false;
          if (toTs && t > toTs) return false;
        }
        return true;
      });

      const { items, meta } = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));

      const assigns = await orderModel.listAssignments();
      const amap = new Map(assigns.map(a => [String(a.orderId), a]));
      const withAssignments = items.map(o => ({
        ...o,
        assignment: amap.get(String(o.id) || String(o.name) || String(o.order_number)) || null,
      }));

      return res.json(ok({ orders: withAssignments, shopifyError: null, shopifyConfigured: isConfigured() }, meta));
    }catch(e){
      log.error('orders.list.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load orders'));
    }
  },
  reports: async (req, res) => {
    const riders = riderModel.list();
    const orders = await orderModel.getAll();
    const totalDeliveries = orders.length;
    const avgDeliveryMins = riders.length ? Math.round(riders.reduce((a, r) => a + (60 - (r.performance / 100) * 30), 0) / riders.length) : 0;
    return res.json(ok({ metrics: { totalDeliveries, avgDeliveryMins }, orders }));
  },

  getOrder: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    return res.json(ok({ order: { ...order, assignment: orderModel.getAssignment(id) || null } }));
  },

  assignOrder: async (req, res) => {
    const id = String(req.params.id);
    const { riderId } = req.body || {};
    const rider = riderModel.getById(riderId);
    if (!rider) return res.status(400).json(fail('Invalid rider'));
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const assignment = await orderModel.assign(id, riderId);
    log.info('order.assigned', { orderId: id, riderId });
    return res.json(ok({ assignment }));
  },

  unassignOrder: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    await orderModel.unassign(id);
    log.info('order.unassigned', { orderId: id });
    return res.json(ok({ ok: true }));
  },
};
