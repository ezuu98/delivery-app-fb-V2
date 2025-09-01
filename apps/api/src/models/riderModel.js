const riders = [
  { id: 1, name: 'Ethan Harper' },
  { id: 2, name: 'Olivia Bennett' },
  { id: 3, name: 'Noah Thompson' },
  { id: 4, name: 'Ava Martinez' },
  { id: 5, name: 'Liam Harris' }
];

export function listRiders() { return riders.slice(); }
export function findRider(id) { return riders.find(r => r.id === Number(id)); }
