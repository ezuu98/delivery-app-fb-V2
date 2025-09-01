import { listOrders, createOrder, assignOrder, updateOrderStatus } from '../models/orderModel.js';
import { findRider } from '../models/riderModel.js';

export function getOrders(req, res) {
  const query = (req.query.q || '').toLowerCase();
  const status = req.query.status;
  let data = listOrders();
  if (status && status !== 'All') data = data.filter(o => o.status === status);
  if (query) data = data.filter(o => (o.id + o.customer + o.address).toLowerCase().includes(query));
  return res.json(data);
}

export function postOrder(req, res) {
  const { customer, address } = req.body || {};
  if (!customer || !address) return res.status(400).json({ message: 'customer and address required' });
  const created = createOrder({ customer, address });
  return res.status(201).json(created);
}

export function patchAssign(req, res) {
  const { id } = req.params;
  const { riderId } = req.body || {};
  if (!riderId) return res.status(400).json({ message: 'riderId required' });
  const rider = findRider(riderId);
  if (!rider) return res.status(404).json({ message: 'rider not found' });
  const updated = assignOrder(id, riderId);
  if (!updated) return res.status(404).json({ message: 'order not found' });
  return res.json(updated);
}

export function patchStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body || {};
  const updated = updateOrderStatus(id, status);
  if (!updated) return res.status(400).json({ message: 'invalid status or order not found' });
  return res.json(updated);
}
