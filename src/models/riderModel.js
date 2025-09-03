const riders = [
  { id: '1', name: 'Ethan Carter', totalKm: 120, performance: 85, commissionUsd: 150, status: 'Active', lastActiveDays: 3 },
  { id: '2', name: 'Olivia Bennett', totalKm: 150, performance: 92, commissionUsd: 180, status: 'Active', lastActiveDays: 6 },
  { id: '3', name: 'Noah Thompson', totalKm: 100, performance: 78, commissionUsd: 120, status: 'Inactive', lastActiveDays: 40 },
  { id: '4', name: 'Ava Martinez', totalKm: 130, performance: 88, commissionUsd: 160, status: 'Active', lastActiveDays: 10 },
  { id: '5', name: 'Liam Harris', totalKm: 110, performance: 82, commissionUsd: 130, status: 'Active', lastActiveDays: 20 },
  { id: '6', name: 'Sophia Clark', totalKm: 140, performance: 90, commissionUsd: 170, status: 'Active', lastActiveDays: 2 }
];

function list() {
  return riders.slice();
}

function getById(id) {
  return riders.find(r => String(r.id) === String(id)) || null;
}

module.exports = { list, getById };
