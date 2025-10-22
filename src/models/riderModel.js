const { getFirestore } = require('../services/firestore');

function daysSince(iso){
  const t = Date.parse(iso || '');
  if (!Number.isFinite(t)) return 9999;
  const diff = Date.now() - t;
  return Math.max(0, Math.floor(diff / 86400000));
}

function mapRider(doc){
  const d = doc && doc.data ? doc.data() : (doc || {});
  const id = String((doc && doc.id) || d.uid || '');
  const name = d.displayName || d.name || d.email || 'Unknown';
  const totalKm = Number(d.totalKm ?? d.total_kms ?? 0);
  const totalDistance = d.totalDistance || null;
  const performance = Number(d.performance || 80);
  const commissionUsd = Number(d.commissionUsd || 0);
  const lastActiveDays = daysSince(d.updatedAt || d.createdAt || null);
  const status = lastActiveDays <= 30 ? 'Active' : 'Inactive';
  const thisMonthKm = Number(d.this_month_kms ?? 0);
  const orders = Array.isArray(d.orders) ? d.orders.slice() : [];
  const contactNumber = d.contactNumber || null;
  const email = d.email || null;
  return { id, name, totalKm, totalDistance, performance, commissionUsd, status, lastActiveDays, thisMonthKm, orders, contactNumber, email };
}

async function list() {
  const db = getFirestore();
  if (!db) return [];
  const snap = await db.collection('riders').get();
  const res = [];
  snap.forEach(doc => { res.push(mapRider(doc)); });
  return res;
}

async function getById(id) {
  const db = getFirestore();
  if (!db) return null;
  const ref = db.collection('riders').doc(String(id));
  const snap = await ref.get();
  if (!snap.exists) return null;
  return mapRider(snap);
}

module.exports = { list, getById };
