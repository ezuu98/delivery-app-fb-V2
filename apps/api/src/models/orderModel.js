let orderCounter = 12350;

export const ORDER_STATUS = ['New', 'Assigned', 'In Transit', 'Delivered'];

const orders = [
  { id: '#12345', customer: 'Sophia Clark', address: '123 Maple Street, Anytown', status: 'New', timePlaced: new Date().toISOString(), riderId: null },
  { id: '#12346', customer: 'Ethan Bennett', address: '456 Oak Avenue, Anytown', status: 'Assigned', timePlaced: new Date().toISOString(), riderId: 2 },
  { id: '#12347', customer: 'Olivia Carter', address: '789 Pine Lane, Anytown', status: 'In Transit', timePlaced: new Date().toISOString(), riderId: 3 },
  { id: '#12348', customer: 'Liam Davis', address: '101 Elm Road, Anytown', status: 'Delivered', timePlaced: new Date().toISOString(), riderId: 1 },
  { id: '#12349', customer: 'Ava Evans', address: '222 Cedar Court, Anytown', status: 'New', timePlaced: new Date().toISOString(), riderId: null }
];

export function listOrders() { return orders.slice().reverse(); }

export function createOrder({ customer, address }) {
  const id = `#${orderCounter++}`;
  const order = { id, customer, address, status: 'New', timePlaced: new Date().toISOString(), riderId: null };
  orders.push(order);
  return order;
}

export function findOrder(id) { return orders.find(o => o.id === id); }

export function assignOrder(id, riderId) {
  const o = findOrder(id);
  if (!o) return null;
  o.riderId = riderId;
  o.status = 'Assigned';
  return o;
}

export function updateOrderStatus(id, status) {
  if (!ORDER_STATUS.includes(status)) return null;
  const o = findOrder(id);
  if (!o) return null;
  o.status = status;
  return o;
}
