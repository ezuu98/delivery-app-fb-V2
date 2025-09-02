const store = [
  { id: 1, text: 'Your order has been received.' },
  { id: 2, text: 'Your order is being prepared.' },
  { id: 3, text: 'Your order is out for delivery.' },
];

module.exports = {
  list: () => store.slice(),
};
