const orderModel = require('../models/orderModel');
const riderModel = require('../models/riderModel');
const deliveryModel = require('../models/deliveryModel');
const { getFirestore } = require('../services/firestore');
const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { listOrders, isConfigured, fetchAllOrders } = require('../services/shopify');
const { ok, fail } = require('../utils/response');
const log = require('../utils/logger');
const { paginate, parseIntParam } = require('../utils/pagination');

// Use local timezone year-month keys to align with UI labels (avoids UTC shifting issues)
function monthKeyLocal(d){
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

// Robustly convert various timestamp representations to a Date or null
function toDateOrNull(v){
  if (!v) return null;
  if (v instanceof Date) return v;
  if (typeof v?.toDate === 'function') { try { return v.toDate(); } catch(_){ /* noop */ } }
  if (typeof v === 'object' && v.seconds !== undefined) { try { return new Date(v.seconds * 1000); } catch(_){ /* noop */ } }
  if (typeof v === 'number') { const ms = v > 1e12 ? v : v * 1000; return new Date(ms); }
  if (typeof v === 'string') { const t = Date.parse(v); if (Number.isFinite(t)) return new Date(t); }
  return null;
}

// Parse distance to kilometers; supports strings like '12.81 km' or '500 m'
function parseKm(v){
  if (v === null || v === undefined) return 0;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string'){
    const s = v.trim().toLowerCase();
    const num = parseFloat(s.replace(',', '.'));
    if (!Number.isFinite(num)) return 0;
    if (s.includes('km')) return num;
    if (s.includes('m') && !s.includes('km')) return num / 1000;
    return num;
  }
  return 0;
}

const MINUTE_TEXT_PATTERN = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i;
const SECOND_TEXT_PATTERN = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
const ISO_DURATION_PATTERN = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i;
const CLOCK_DURATION_PATTERN = /^\d{1,2}:\d{2}(?::\d{2})?$/;

function parseMinutes(value){
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const minuteMatch = trimmed.match(MINUTE_TEXT_PATTERN);
    if (minuteMatch) return parseFloat(minuteMatch[1]);
    const secondMatch = trimmed.match(SECOND_TEXT_PATTERN);
    if (secondMatch) return parseFloat(secondMatch[1]) / 60;
    const isoMatch = trimmed.match(ISO_DURATION_PATTERN);
    if (isoMatch) {
      const days = Number(isoMatch[1] || 0);
      const hours = Number(isoMatch[2] || 0);
      const minutes = Number(isoMatch[3] || 0);
      const seconds = Number(isoMatch[4] || 0);
      return (days * 1440) + (hours * 60) + minutes + (seconds / 60);
    }
    if (CLOCK_DURATION_PATTERN.test(trimmed)) {
      const parts = trimmed.split(':').map(part => Number(part));
      if (parts.length === 2) {
        const [hours, minutes] = parts;
        if (Number.isFinite(hours) && Number.isFinite(minutes)) return (hours * 60) + minutes;
      } else if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        if (Number.isFinite(hours) && Number.isFinite(minutes) && Number.isFinite(seconds)) {
          return (hours * 60) + minutes + (seconds / 60);
        }
      }
    }
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) return numeric;
    return null;
  }
  if (typeof value === 'object') {
    if (Number.isFinite(value.minutes)) return Number(value.minutes);
    if (Number.isFinite(value.expectedMinutes)) return Number(value.expectedMinutes);
    if (Number.isFinite(value.duration)) return Number(value.duration);
    if (Number.isFinite(value.seconds)) return Number(value.seconds) / 60;
    if (Number.isFinite(value.millis)) return Number(value.millis) / 60000;
    if (Number.isFinite(value.ms)) return Number(value.ms) / 60000;
    if (value.value !== undefined) {
      const nested = parseMinutes(value.value);
      if (nested !== null) return nested;
    }
    if (value.duration !== undefined) {
      const nested = parseMinutes(value.duration);
      if (nested !== null) return nested;
    }
  }
  return null;
}

function resolveOrderDistanceKm(order, assignment){
  const candidates = [
    order?.distance_km,
    order?.distanceKm,
    order?.distance,
    order?.totalDistance,
    order?.total_distance,
    order?.distance_meters,
    order?.distanceMeters,
    order?.orders?.distance,
    order?.orders?.distance_km,
    order?.orders?.distanceKm,
    order?.orders?.totalDistance,
    order?.orders?.total_distance,
    order?.orders?.distance_meters,
    order?.orders?.distanceMeters,
    assignment?.distance,
    assignment?.distance_km,
    assignment?.distanceKm,
  ];
  for (const candidate of candidates){
    const km = parseKm(candidate);
    if (km > 0) return km;
  }
  return null;
}

function normalizeStatus(value){
  if (typeof value !== 'string') return '';
  const normalized = value.toLowerCase().trim().replace(/[\s-]+/g, '_');
  if (normalized === 'in_transit') return 'in_progress';
  return normalized;
}

async function findOrderByAnyId(id){
  const raw = String(id || '');
  const tried = [];
  const candidates = [];
  // try exact
  candidates.push(raw);
  // try stripped (# removed)
  candidates.push(raw.replace(/^#+/, ''));
  // try with single leading #
  if(!raw.startsWith('#')) candidates.push('#' + raw);
  // try with double leading #
  if(!raw.startsWith('##')) candidates.push('##' + raw);

  // Prefer Firestore lookup first (so UI reads from Firestore)
  try{
    const db = getFirestore();
    if (db) {
      // Try direct document id lookups
      for (const k of candidates) {
        if (!k) continue;
        tried.push(k);
        try{
          const snap = await db.collection('orders').doc(String(k)).get();
          if (snap && snap.exists) return { key: String(k), order: snap.data() || {} };
        }catch(_){ /* ignore per-candidate errors */ }
      }

      // If direct doc lookups failed, try querying common fields (orderId, order_number, name)
      const queryFields = ['orderId','order_number','name','order_number'];
      for (const k of candidates) {
        if (!k) continue;
        for (const field of queryFields) {
          try{
            const q = await db.collection('orders').where(field, '==', k).limit(1).get();
            if (q && !q.empty) {
              const doc = q.docs[0];
              return { key: String(doc.id), order: doc.data() || {} };
            }
          }catch(_){ /* ignore query errors */ }
        }
      }

      // Also try numeric equality for order_number (as number)
      if (/^\d+$/.test(raw)){
        const num = raw;
        try{
          const q = await db.collection('orders').where('order_number', '==', num).limit(1).get();
          if (q && !q.empty) { const doc = q.docs[0]; return { key: String(doc.id), order: doc.data() || {} }; }
        }catch(_){ }
      }
    }
  }catch(_){ /* ignore firestore errors */ }

  // Fallback to cache (redis/in-memory)
  for(const k of candidates){
    if(!k) continue;
    if (!tried.includes(k)) tried.push(k);
    try{
      const o = await orderModel.getById(String(k));
      if(o) return { key: String(k), order: o };
    }catch(_){ }
  }

  // As last resort, try scanning assignments/cache keys for matching order_number/name
  try{
    const all = await orderModel.getAll();
    for(const o of all){
      const keys = [String(o.id||''), String(o.name||''), String(o.order_number||'')].map(s=>s.replace(/^#+/,''));
      if(keys.includes(raw.replace(/^#+/,''))) return { key: String(o.id||o.name||o.order_number||''), order: o };
    }
  }catch(_){ }

  return { key: null, order: null, tried };
}

function normalizeRiderIdFromOrder(order){
  if (!order || typeof order !== 'object') return null;
  const candidates = [
    order.riderId,
    order.rider_id,
    order.riderID,
    order.assignment?.riderId,
    order.assignment?.riderID,
    order.assigned_to_id,
    order.assigned_to,
  ];
  for (const candidate of candidates){
    if (candidate === undefined || candidate === null) continue;
    const value = String(candidate).trim();
    if (value) return value;
  }
  return null;
}

function normalizeExpectedCandidate(value){
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object') {
    if (value.minutes !== undefined) {
      const minutes = Number(value.minutes);
      return Number.isFinite(minutes) ? { minutes } : null;
    }
    if (value.seconds !== undefined) {
      const seconds = Number(value.seconds);
      return Number.isFinite(seconds) ? { seconds } : null;
    }
    if (value.expectedMinutes !== undefined) {
      const minutes = Number(value.expectedMinutes);
      return Number.isFinite(minutes) ? { minutes } : null;
    }
    if (value.expectedAt !== undefined) {
      const normalized = normalizeExpectedCandidate(value.expectedAt);
      if (normalized !== null) return normalized;
    }
    if (value.value !== undefined) {
      const normalized = normalizeExpectedCandidate(value.value);
      if (normalized !== null) return normalized;
    }
    if (value.time !== undefined) {
      const normalized = normalizeExpectedCandidate(value.time);
      if (normalized !== null) return normalized;
    }
    if (value.duration !== undefined) {
      const normalized = normalizeExpectedCandidate(value.duration);
      if (normalized !== null) return normalized;
    }
    if (value.at !== undefined) {
      const normalized = normalizeExpectedCandidate(value.at);
      if (normalized !== null) return normalized;
    }
    const entries = Object.values(value);
    for (const entry of entries) {
      const normalized = normalizeExpectedCandidate(entry);
      if (normalized !== null) return normalized;
    }
    return null;
  }
  return null;
}
function getNestedValue(source, path){
  let current = source;
  for (const key of path) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = current[key];
  }
  return current;
}
function resolveExpectedDeliveryValue(order, etaEvent){
  if (!order || typeof order !== 'object') return null;
  const candidatePaths = [
    ['expected_delivery_time'],
    ['expectedDeliveryTime'],
    ['expected_time'],
    ['expectedTime'],
    ['order', 'expected_delivery_time'],
    ['order', 'expectedDeliveryTime'],
    ['orders', 'expected_delivery_time'],
    ['orders', 'expectedDeliveryTime'],
    ['delivery', 'expected_delivery_time'],
    ['delivery', 'expectedDeliveryTime'],
    ['expected_delivery', 'time'],
    ['expected_delivery', 'minutes'],
    ['expectedDelivery', 'time'],
    ['expectedDelivery', 'minutes'],
    ['delivery', 'eta'],
    ['eta'],
  ];
  for (const path of candidatePaths) {
    const candidate = getNestedValue(order, path);
    const normalized = normalizeExpectedCandidate(candidate);
    if (normalized !== null) return normalized;
  }
  if (Array.isArray(order.delivery_events) || Array.isArray(order.deliveryEvents) || Array.isArray(order.events)) {
    const eventsList = order.delivery_events || order.deliveryEvents || order.events;
    for (let i = eventsList.length - 1; i >= 0; i -= 1) {
      const ev = eventsList[i];
      if (!ev || typeof ev !== 'object') continue;
      const type = typeof ev.type === 'string' ? ev.type.toLowerCase().trim() : '';
      if (type !== 'eta' && type !== 'expected') continue;
      const normalized = normalizeExpectedCandidate(ev);
      if (normalized !== null) return normalized;
    }
  }
  if (etaEvent && typeof etaEvent === 'object') {
    const candidate = normalizeExpectedCandidate(etaEvent.expectedMinutes !== undefined ? { minutes: etaEvent.expectedMinutes } : etaEvent);
    if (candidate !== null) return candidate;
  }
  return null;
}

function lastOf(list, type){
  if (!Array.isArray(list) || !type) return null;
  for (let i = list.length - 1; i >= 0; i -= 1){
    const entry = list[i];
    if (entry && entry.type === type) return entry;
  }
  return null;
}

async function computeRiderAssignmentCounts(){
  // returns Map<riderId, { total: number, months: Map<'YYYY-MM', number>, ridesMonths: Map<'YYYY-MM', number>, totalRides: number }>
  // Totals represent kilometers traveled (sum of per-order distance) and rides represent order counts per month
  const counts = new Map();
  const seenOrders = new Set();

  // Build month keys for last 3 months (YYYY-MM)
  const now = new Date();
  const monthKeys = [];
  for(let i=2;i>=0;i--){
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKeyLocal(d);
    monthKeys.push(key);
  }

  function ensureEntry(riderId){
    if (!counts.has(riderId)){
      const kmByMonth = new Map();
      const ridesByMonth = new Map();
      for(const k of monthKeys){
        kmByMonth.set(k, 0);
        ridesByMonth.set(k, 0);
      }
      // Keep backward-compatible fields (total, months) while adding explicit fields
      counts.set(riderId, {
        total: 0, // total kilometers
        months: kmByMonth, // km per month (back-compat)
        totalKm: 0,
        monthsKm: kmByMonth,
        totalRides: 0,
        ridesMonths: ridesByMonth,
        // Performance counters (strictly based on orders.onTime)
        perfOnTime: 0,
        perfTotal: 0,
      });
    }
    return counts.get(riderId);
  }

  try{
    const db = getFirestore();
    if (db){
      const snap = await db.collection('orders').get();
      snap.forEach(doc => {
        const data = doc.data() || {};
        const riderId = normalizeRiderIdFromOrder(data);
        const orderId = String(data.orderId || data.id || data.name || data.order_number || doc.id || '').trim();
        if (orderId) seenOrders.add(orderId);
        if (!riderId) return;
        const entry = ensureEntry(riderId);
        const kmRaw = (data.totalDistance ?? data.total_distance ?? data.distanceKm ?? data.distance_km ?? 0);
        const addKm = parseKm(kmRaw);
        entry.total = (entry.total || 0) + addKm;
        entry.totalKm = (entry.totalKm || 0) + addKm;
        // determine month key from created_at or other date fields
        const created = data.created_at || data.createdAt || data.created || null;
        const dd = toDateOrNull(created);
        if (dd){
          const k = monthKeyLocal(dd);
          if (entry.months.has(k)) entry.months.set(k, (entry.months.get(k) || 0) + addKm);
          if (entry.ridesMonths && entry.ridesMonths.has(k)){
            entry.ridesMonths.set(k, (entry.ridesMonths.get(k) || 0) + 1);
            entry.totalRides = (entry.totalRides || 0) + 1;
          }
        }
        // Performance (strictly orders.onTime stored at top-level as onTime)
        if (data && Object.prototype.hasOwnProperty.call(data, 'onTime')){
          entry.perfTotal = (entry.perfTotal || 0) + 1;
          if (data.onTime === true) entry.perfOnTime = (entry.perfOnTime || 0) + 1;
        }
      });
    }
  }catch(e){
    log.warn('riders.count.orders.firestore.failed', { message: e?.message });
  }

  try{
    const cachedOrders = await orderModel.getAll();
    for (const order of cachedOrders){
      const orderId = String(order?.orderId || order?.id || order?.name || order?.order_number || '').trim();
      if (orderId && seenOrders.has(orderId)) continue;
      const riderId = normalizeRiderIdFromOrder(order);
      if (!riderId) continue;
      const entry = ensureEntry(riderId);
      const kmRaw = (order?.totalDistance ?? order?.total_distance ?? order?.distanceKm ?? order?.distance_km ?? 0);
      const addKm = parseKm(kmRaw);
      entry.total = (entry.total || 0) + addKm;
      entry.totalKm = (entry.totalKm || 0) + addKm;
      if (orderId) seenOrders.add(orderId);
      const created = order?.created_at || order?.createdAt || order?.created || null;
      const dd = toDateOrNull(created);
      if (dd){
        const k = monthKeyLocal(dd);
        if (entry.months.has(k)) entry.months.set(k, (entry.months.get(k) || 0) + addKm);
        if (entry.ridesMonths && entry.ridesMonths.has(k)){
          entry.ridesMonths.set(k, (entry.ridesMonths.get(k) || 0) + 1);
          entry.totalRides = (entry.totalRides || 0) + 1;
        }
      }
      // Performance (strictly orders.onTime stored at top-level as onTime)
      if (order && Object.prototype.hasOwnProperty.call(order, 'onTime')){
        entry.perfTotal = (entry.perfTotal || 0) + 1;
        if (order.onTime === true) entry.perfOnTime = (entry.perfOnTime || 0) + 1;
      }
    }
  }catch(e){
    log.warn('riders.count.orders.cache.failed', { message: e?.message });
  }

  return counts;
}

async function updateRiderDoc(id, patch){
  const db = getFirestore();
  if (!db) throw new Error('Firestore not configured');
  const ref = db.collection('riders').doc(String(id));
  const now = new Date().toISOString();
  const data = { updatedAt: now };
  if (patch.displayName !== undefined) data.displayName = String(patch.displayName).trim().slice(0,120) || null;
  if (patch.contactNumber !== undefined) data.contactNumber = String(patch.contactNumber).trim().slice(0,40) || null;
  if (patch.email !== undefined) data.email = String(patch.email).trim() || null;
  await ref.set(data, { merge: true });
  const snap = await ref.get();
  return { id: String(ref.id), ...(snap.data() || {}) };
}

async function deleteRiderDoc(id){
  const db = getFirestore();
  if (!db) throw new Error('Firestore not configured');
  const ref = db.collection('riders').doc(String(id));
  await ref.delete();
  return true;
}

module.exports = {
  packers: async (req, res) => {
    try{
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore not configured'));
      const { limit = '200' } = req.query || {};
      const n = parseIntParam(limit, 200);
      const snap = await db.collection('packers').limit(Math.max(1, Math.min(500, n))).get();
      const packers = [];
      snap.forEach(doc => {
        const d = doc.data() || {};
        packers.push({ id: doc.id, name: d.fullName || d.name || null, lastActiveDays: d.lastActiveDays, contactNumber: d.contactNumber || null, email: d.email || null });
      });
      return res.json(ok({ packers }));
    }catch(e){
      return res.status(500).json(fail('Failed to load packers'));
    }
  },
  createPacker: async (req, res) => {
    try{
      const { email = '', password = '', fullName = '', contactNumber = '' } = req.body || {};
      const em = String(email).trim();
      const pw = String(password);
      const fn = String(fullName).trim();
      const cn = String(contactNumber).trim();
      const digits = cn.replace(/\D+/g, '');
      if(!fn || !cn || !pw) return res.status(400).json(fail('Full name, mobile and password are required'));
      const isLocal10 = digits.length === 10;
      const isPkWithCode = digits.length === 12 && digits.startsWith('92');
      if(!isLocal10 && !isPkWithCode) return res.status(400).json(fail('numbers should be 10 digit'));
      if(em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return res.status(400).json(fail('Invalid email'));
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore not configured'));
      const now = new Date().toISOString();
      const payload = {
        fullName: fn,
        name: fn,
        email: em || null,
        contactNumber: cn,
        plainPassword: pw,
        createdAt: now,
        status: 'active',
        orders: [],
      };
      const ref = await db.collection('packers').add(payload);
      return res.json(ok({ id: ref.id }));
    }catch(e){
      return res.status(500).json(fail('Failed to create packer'));
    }
  },
  assignPacker: async (req, res) => {
    try{
      const rawId = String(req.params.id);
      const { packerId, paymentMethod, amount } = req.body || {};
      if(!packerId) return res.status(400).json(fail('Missing packerId'));
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore not configured'));
      const id = rawId.replace(/^#+/, '');
      const orderRef = db.collection('orders').doc(id);

      const updateData = { orderId: id, packed_by: String(packerId) };
      if (paymentMethod) updateData.paymentMethod = String(paymentMethod).trim();
      if (amount) updateData.amount = String(amount).trim();

      await orderRef.set(updateData, { merge: true });

      // Also add order id into packer's orders array
      try{
        const admin = require('../services/firebaseAdmin').initFirebaseAdmin();
        const FV = admin && admin.firestore && admin.firestore.FieldValue ? admin.firestore.FieldValue : null;
        if (FV){
          await db.collection('packers').doc(String(packerId)).set({ orders: FV.arrayUnion(id) }, { merge: true });
        } else {
          // Fallback: ensure orders array exists and push manually (not atomic)
          const pref = db.collection('packers').doc(String(packerId));
          const snap = await pref.get();
          const data = snap.exists ? (snap.data() || {}) : {};
          const next = Array.isArray(data.orders) ? data.orders.slice() : [];
          if (!next.includes(id)) next.push(id);
          await pref.set({ orders: next }, { merge: true });
        }
      }catch(_){ /* ignore packer orders push errors */ }

      let packerName = null;
      try{
        const pref = db.collection('packers').doc(String(packerId));
        const psnap = await pref.get();
        if(psnap.exists){
          const pdata = psnap.data() || {};
          packerName = pdata.fullName || pdata.name || null;
        }
      }catch(_){ /* ignore packer name fetch errors */ }

      return res.json(ok({ orderId: id, packerId, packerName }));
    }catch(e){
      return res.status(500).json(fail('Failed to assign packer'));
    }
  },
  riderKmInRange: async (req, res) => {
    try{
      const riderId = String(req.params.id || '').trim();
      const { fromDate, toDate } = req.query || {};
      if (!riderId) return res.status(400).json(fail('Missing riderId'));
      if (!fromDate || !toDate) return res.status(400).json(fail('Missing fromDate or toDate'));

      const from = toDateOrNull(fromDate);
      const to = toDateOrNull(toDate);
      if (!from || !to) return res.status(400).json(fail('Invalid date format'));

      // Set toDate to end of day
      const toEnd = new Date(to);
      toEnd.setHours(23, 59, 59, 999);

      let totalKm = 0;
      let rideCount = 0;
      let onTimeCount = 0;
      const debug = { ordersChecked: 0, ordersMatched: 0, errors: [] };

      try{
        const db = getFirestore();
        if (db){
          const checkedIds = new Set();
          const toCheckIds = new Set();

          // Collect from riders.orders
          try{
            const riderSnap = await db.collection('riders').doc(String(riderId)).get();
            if (riderSnap.exists){
              const riderData = riderSnap.data() || {};
              const orderIds = Array.isArray(riderData.orders) ? riderData.orders : [];
              debug.riderOrderCount = orderIds.length;
              for (const oid of orderIds){ if (oid !== undefined && oid !== null) toCheckIds.add(String(oid)); }
            } else {
              debug.errors.push('Rider document not found');
            }
          }catch(e){ debug.errors.push('riderDoc:' + String(e.message)); }

          // Also collect by querying orders where riderId == riderId
          try{
            const qSnap = await db.collection('orders').where('riderId','==', String(riderId)).get();
            qSnap.forEach(doc => {
              const id = String(doc.id);
              toCheckIds.add(id);
            });
            debug.queryByRiderId = (qSnap && typeof qSnap.size === 'number') ? qSnap.size : undefined;
          }catch(e){ debug.errors.push('queryRiderId:' + String(e.message)); }

          // Iterate unique IDs; also process already-fetched docs from query to avoid refetch
          const preloaded = new Map();
          try{
            const qSnap = await db.collection('orders').where('riderId','==', String(riderId)).get();
            qSnap.forEach(doc => { preloaded.set(String(doc.id), doc.data() || {}); });
          }catch(_){ }

          for (const orderId of toCheckIds){
            debug.ordersChecked += 1;
            try{
              const data = preloaded.has(String(orderId)) ? preloaded.get(String(orderId)) : (await db.collection('orders').doc(String(orderId)).get()).data();
              if (data){
                const assignedAt = toDateOrNull(data.assignedAt);
                if (assignedAt && assignedAt >= from && assignedAt <= toEnd){
                  if (!checkedIds.has(String(orderId))) debug.ordersMatched += 1;
                  checkedIds.add(String(orderId));
                  rideCount += 1;
                  const distanceRaw = data.totalDistance || data.distance || data.distance_km || data.distanceKm || 0;
                  const km = parseKm(distanceRaw);
                  if (km > 0) totalKm += km;
                  if (data.onTime === true) onTimeCount += 1;
                }
              }
            }catch(e){ debug.errors.push('order:' + String(orderId) + ':' + String(e.message)); }
          }
        }
      }catch(e){
        debug.errors.push(String(e.message));
        log.warn('rider.km.range.firestore.failed', { riderId: String(riderId), message: e?.message });
      }

      const performancePct = rideCount > 0 ? Math.round((onTimeCount / rideCount) * 100) : 0;
      return res.json(ok({ riderId, fromDate, toDate, totalKm, rideCount, onTimeCount, performancePct, debug }));
    }catch(e){
      log.error('rider.km.range.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to calculate rider km'));
    }
  },

  riderPerformanceReport: async (req, res) => {
    try{
      const riderId = String(req.params.id || '').trim();
      const { fromDate, toDate } = req.query || {};
      if (!riderId) return res.status(400).json(fail('Missing riderId'));
      if (!fromDate || !toDate) return res.status(400).json(fail('Missing fromDate or toDate'));

      const from = toDateOrNull(fromDate);
      const to = toDateOrNull(toDate);
      if (!from || !to) return res.status(400).json(fail('Invalid date format'));

      const toEnd = new Date(to);
      toEnd.setHours(23, 59, 59, 999);

      let totalShopifyRides = 0;
      let totalExtraRides = 0;
      let totalDistanceKm = 0;
      let totalExpectedMinutes = 0;
      let totalActualMinutes = 0;
      let onTimeCount = 0;
      let acceptedCount = 0;
      let totalOrders = 0;
      let acceptanceTimeValues = [];
      let unAssignedOrders = null;
      let hasUnAssignedOrdersField = false;
      const debug = { ordersProcessed: 0, errors: [] };

      try {
        const db = getFirestore();
        if (db) {
          const checkedIds = new Set();
          const toCheckIds = new Set();

          try {
            const riderSnap = await db.collection('riders').doc(String(riderId)).get();
            if (riderSnap.exists) {
              const riderData = riderSnap.data() || {};
              const orderIds = Array.isArray(riderData.orders) ? riderData.orders : [];
              for (const oid of orderIds) {
                if (oid !== undefined && oid !== null) toCheckIds.add(String(oid));
              }
              if (Array.isArray(riderData.unAssignedOrders)) {
                hasUnAssignedOrdersField = true;
                unAssignedOrders = new Set(riderData.unAssignedOrders.map(id => String(id)));
              }
            }
          } catch (e) {
            debug.errors.push('riderDoc:' + String(e.message));
          }

          try {
            const qSnap = await db.collection('orders').where('riderId', '==', String(riderId)).get();
            qSnap.forEach(doc => {
              const id = String(doc.id);
              toCheckIds.add(id);
            });
          } catch (e) {
            debug.errors.push('queryRiderId:' + String(e.message));
          }

          const preloaded = new Map();
          try {
            const qSnap = await db.collection('orders').where('riderId', '==', String(riderId)).get();
            qSnap.forEach(doc => {
              preloaded.set(String(doc.id), doc.data() || {});
            });
          } catch (_) {}

          for (const orderId of toCheckIds) {
            try {
              const data = preloaded.has(String(orderId))
                ? preloaded.get(String(orderId))
                : (await db.collection('orders').doc(String(orderId)).get()).data();

              if (data) {
                const assignedAt = toDateOrNull(data.assignedAt);
                if (assignedAt && assignedAt >= from && assignedAt <= toEnd) {
                  if (!checkedIds.has(String(orderId))) debug.ordersProcessed += 1;
                  checkedIds.add(String(orderId));
                  totalOrders += 1;
                  totalShopifyRides += 1;

                  const distanceRaw = data.totalDistance || data.distance || data.distance_km || data.distanceKm || 0;
                  const km = parseKm(distanceRaw);
                  if (km > 0) totalDistanceKm += km;

                  if (data.onTime === true) onTimeCount += 1;

                  const expectedMinutesRaw = data.expectedDeliveryTime || data.expected_delivery_time || null;
                  const expectedMins = parseMinutes(expectedMinutesRaw);
                  if (expectedMins !== null && expectedMins > 0) {
                    totalExpectedMinutes += expectedMins;
                  }

                  let actualMins = null;
                  if (data.deliveryEndTime && data.deliveryStartTime) {
                    try {
                      const endTime = toDateOrNull(data.deliveryEndTime);
                      const startTime = toDateOrNull(data.deliveryStartTime);
                      if (endTime && startTime) {
                        const diffMs = endTime.getTime() - startTime.getTime();
                        actualMins = diffMs / (1000 * 60);
                      }
                    } catch (_) {}
                  }
                  if (actualMins === null && (data.actualDeliveryTime || data.actual_delivery_time)) {
                    actualMins = parseMinutes(data.actualDeliveryTime || data.actual_delivery_time);
                  }
                  if (actualMins !== null && actualMins > 0) {
                    totalActualMinutes += actualMins;
                  }

                  if (data.accepted === true) {
                    acceptedCount += 1;
                  }

                  const acceptanceTime = parseMinutes(data.acceptanceTime || data.acceptance_time);
                  if (acceptanceTime !== null && acceptanceTime >= 0) {
                    acceptanceTimeValues.push(acceptanceTime);
                  }
                }
              }
            } catch (e) {
              debug.errors.push('order:' + String(orderId) + ':' + String(e.message));
            }
          }
        }
      } catch (e) {
        debug.errors.push(String(e.message));
        log.warn('rider.performance.report.firestore.failed', { riderId: String(riderId), message: e?.message });
      }

      const onTimeRate = totalOrders > 0 ? Math.round((onTimeCount / totalOrders) * 100) : 0;
      const acceptancePercentage = totalOrders > 0 ? Math.round((acceptedCount / totalOrders) * 100) : 0;
      const averageExpectedMinutes = totalOrders > 0 && totalExpectedMinutes > 0 ? Math.round(totalExpectedMinutes / totalOrders) : 0;
      const averageActualMinutes = totalOrders > 0 && totalActualMinutes > 0 ? Math.round(totalActualMinutes / totalOrders) : 0;
      const averageAcceptanceTime = acceptanceTimeValues.length > 0 ? Math.round(acceptanceTimeValues.reduce((a, b) => a + b, 0) / acceptanceTimeValues.length) : 0;

      return res.json(ok({
        riderId,
        fromDate,
        toDate,
        totalShopifyRides,
        totalExtraRides,
        totalDistanceKm,
        averageExpectedMinutes,
        averageActualMinutes,
        onTimeRate,
        acceptancePercentage,
        averageAcceptanceTime,
        totalOrders,
        debug,
      }));
    } catch (e) {
      log.error('rider.performance.report.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to generate performance report'));
    }
  },

  updateRider: async (req, res) => {
    try{
      const id = String(req.params.id || '').trim();
      if (!id) return res.status(400).json(fail('Missing rider id'));
      const { displayName, contactNumber, email } = req.body || {};
      if (displayName == null && contactNumber == null && email == null) return res.status(400).json(fail('No fields to update'));
      const rider = await updateRiderDoc(id, { displayName, contactNumber, email });
      return res.json(ok({ rider }, 'Updated'));
    }catch(e){
      return res.status(500).json(fail('Failed to update rider'));
    }
  },

  deleteRider: async (req, res) => {
    try{
      const id = String(req.params.id || '').trim();
      if (!id) return res.status(400).json(fail('Missing rider id'));
      await deleteRiderDoc(id);
      return res.json(ok({ deleted: true }, 'Deleted'));
    }catch(e){
      return res.status(500).json(fail('Failed to delete rider'));
    }
  },

  riders: async (req, res) => {
    const { q = '', status = 'all', lastDays = 'all', page = '1', limit = '20' } = req.query || {};
    const list = await riderModel.list();
    const counts = list.length ? await computeRiderAssignmentCounts() : new Map();

    // Load all orders from Firestore to resolve orders.onTime when riders.orders contains IDs
    const orderMap = new Map();
    try{
      const db = getFirestore();
      if (db){
        const snap = await db.collection('orders').get();
        snap.forEach(doc => {
          const o = doc.data() || {};
          const ids = [o?.orderId, o?.id, o?.name, o?.order_number, doc.id];
          for (const id of ids){ if (id !== undefined && id !== null) orderMap.set(String(id), o); }
        });
      }
    }catch(e){
      log.warn('riders.orders.firestore.failed', { message: e?.message });
      // fallback to cached orders
      const allOrders = await orderModel.getAll().catch(()=>[]);
      for (const o of allOrders){
        const ids = [o?.orderId, o?.id, o?.name, o?.order_number];
        for (const id of ids){ if (id !== undefined && id !== null) orderMap.set(String(id), o); }
      }
    }

    const withTotals = list.map(r => {
      const key = String(r.id || '').trim();
      const entry = counts.get(key) || { total: 0, months: new Map(), ridesMonths: new Map(), totalRides: 0 };
      // convert months map to plain object { 'YYYY-MM': value }
      const monthsObj = {};
      if (entry.months && typeof entry.months.forEach === 'function'){
        entry.months.forEach((v,k)=>{ monthsObj[k] = v; });
      }
      const ridesObj = {};
      if (entry.ridesMonths && typeof entry.ridesMonths.forEach === 'function'){
        entry.ridesMonths.forEach((v,k)=>{ ridesObj[k] = v; });
      }
      // Performance from riders.orders using orders.onTime
      const riderOrdersArr = Array.isArray(r.orders) ? r.orders : [];
      const perfTotal = riderOrdersArr.length;
      let perfOnTime = 0;
      for (const item of riderOrdersArr){
        if (item && typeof item === 'object'){
          if (Object.prototype.hasOwnProperty.call(item, 'onTime') && item.onTime === true) { perfOnTime += 1; continue; }
          const oid = String(item.orderId || item.id || item.name || item.order_number || '').trim();
          if (oid){ const ord = orderMap.get(oid); if (ord && Object.prototype.hasOwnProperty.call(ord, 'onTime') && ord.onTime === true) perfOnTime += 1; }
        } else if (item != null) {
          const ord = orderMap.get(String(item));
          if (ord && Object.prototype.hasOwnProperty.call(ord, 'onTime') && ord.onTime === true) perfOnTime += 1;
        }
      }
      const performancePct = perfTotal ? Math.round((perfOnTime / perfTotal) * 100) : 0;

      return { ...r, assignedOrders: entry.total || 0, monthlyCounts: monthsObj, monthlyRideCounts: ridesObj, performancePct };
    });
    const filtered = withTotals.filter(r => {
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
    let rider = await riderModel.getById(req.params.id);
    if (!rider){
      try{
        const db = getFirestore();
        log.warn('rider.profile.lookup_failed', { id: String(req.params.id), dbAvailable: !!db });
      }catch(_){ }
      // Fallback: try to find within rider list (in case IDs differ)
      try{
        const list = await riderModel.list().catch(()=>[]);
        const found = list.find(r => String(r.id) === String(req.params.id) || String(r.name).toLowerCase() === String(req.params.id).toLowerCase());
        if(found) rider = found;
      }catch(_){ }
    }
    if (!rider) return res.status(404).json(fail('Not Found'));

    try{
      const orders = await orderModel.getAll();
      const assigns = await orderModel.listAssignments();
      const aMap = new Map(assigns.map(a => [String(a.orderId), a]));
      const evAll = await deliveryModel.listAll();

      // Build list of this rider's orders from rider.orders array
      const eventsByOrderId = new Map();
      for (const { orderId, events } of evAll){
        const key = String(orderId || '').trim();
        if (!key) continue;
        eventsByOrderId.set(key, Array.isArray(events) ? events : []);
      }

      let riderOrderIds = [];
      try{
        const db = getFirestore();
        if (db) {
          try{
            const snap = await db.collection('riders').doc(String(req.params.id)).get();
            if (snap && snap.exists) {
              const d = snap.data() || {};
              if (Array.isArray(d.orders)) riderOrderIds = d.orders.map(v => String(v));
            }
          }catch(_){ }
        }
      }catch(_){ }
      if (!riderOrderIds.length && Array.isArray(rider.orders)) riderOrderIds = rider.orders.map(v=>String(v));
      let riderOrders = [];
      try{
        const db = getFirestore();
        if (!db) throw new Error('no-db');
        // Strict behavior: for each id in riders.orders[], fetch the order doc by orderId and use only deliveryStartTime and distance fields from that doc
        for (const oid of riderOrderIds){
          const key = String(oid);
          let base = null;
          try{
            const qsnap = await db.collection('orders').where('orderId','==', key).limit(1).get();
            if (qsnap && !qsnap.empty) base = qsnap.docs[0].data() || null;
          }catch(_){ }

          const deliveryStart = base && base.deliveryStartTime !== undefined ? base.deliveryStartTime : null;
          const totalDistanceRaw = base ? (base.totalDistance ?? base.total_distance ?? base.distance ?? base.distance_km ?? base.distanceKm ?? null) : null;
          const distanceKm = (totalDistanceRaw !== null && totalDistanceRaw !== undefined && totalDistanceRaw !== '') ? parseKm(totalDistanceRaw) : null;

          riderOrders.push({
            orderId: key,
            name: base ? (base.name || base.order_number || base.orderId || key) : key,
            created_at: base ? (base.created_at || base.createdAt || null) : null,
            expected_delivery_time: base ? (base.expected_delivery_time ?? null) : null,
            actual_delivery_time: base ? (base.actual_delivery_time ?? null) : null,
            current_status: base ? (base.current_status ?? null) : null,
            shipping_address: base ? (base.shipping_address ?? null) : null,
            distance_km: distanceKm,
            totalDistance: totalDistanceRaw ?? undefined,
            deliveryStartTime: deliveryStart,
            deliveryEndTime: base ? (base.deliveryEndTime ?? null) : null,
            deliveryDuration: base ? (base.deliveryDuration ?? undefined) : undefined,
            durationMins: base ? (base.deliveryDuration ?? undefined) : undefined,
            expectedMinutes: undefined,
            deliveredAt: base ? (base.actual_delivery_time ?? undefined) : undefined,
            assignedAt: undefined,
            orders: undefined,
            onTime: base ? (base.onTime ?? false) : false,
          });
        }
      }catch(_){
        for (const oid of riderOrderIds){
          const key = String(oid);
          riderOrders.push({ orderId: key, name: key, created_at: null, expected_delivery_time: null, actual_delivery_time: null, current_status: null, shipping_address: null, distance_km: null, totalDistance: undefined, deliveryStartTime: null, deliveryEndTime: null, deliveryDuration: undefined, durationMins: undefined, expectedMinutes: undefined, deliveredAt: undefined, assignedAt: undefined, orders: undefined });
        }
      }

      const riderIdStr = String(rider.id);
      const deliveries = [];

      for (const { orderId, events } of evAll){
        const id = String(orderId);
        const order = orders.find(o => String(o.id||o.name||o.order_number) === id) || null;
        const assignment = aMap.get(id) || null;
        const etaEv = lastOf(events, 'eta');
        const ofdEv = lastOf(events, 'out_for_delivery');
        const pickupEv = lastOf(events, 'pickup');
        const deliveredEv = lastOf(events, 'delivered');

        // determine which rider this delivery is associated with
        const candidateRiderIds = [
          assignment?.riderId,
          etaEv?.riderId,
          ofdEv?.riderId,
          pickupEv?.riderId,
          deliveredEv?.riderId,
          order?.riderId,
          order?.rider_id,
          order?.assigned_to_id,
        ].map(v=> v===undefined||v===null?null:String(v).trim()).filter(Boolean);
        if (!candidateRiderIds.includes(riderIdStr)) continue;

        const startAt = ofdEv?.at || pickupEv?.at || (order?.created_at || null);
        const deliveredAt = deliveredEv?.at || null;
        let durationMins = null;
        if (startAt && deliveredAt){
          const t1 = Date.parse(startAt); const t2 = Date.parse(deliveredAt);
          if (Number.isFinite(t1) && Number.isFinite(t2) && t2 >= t1) durationMins = Math.round((t2 - t1) / 60000);
        }

        deliveries.push({
          orderId: id,
          orderNumber: order?.name || order?.order_number || id,
          riderId: riderIdStr,
          expectedMinutes: etaEv?.expectedMinutes ?? null,
          expectedAt: etaEv?.expectedAt ?? null,
          deliveredAt,
          durationMins,
          status: deliveredAt ? 'delivered' : (ofdEv ? 'in_progress' : (assignment ? 'assigned' : 'new')),
          distanceKm: resolveOrderDistanceKm(order, assignment) ?? null,
        });
      }

      const deliveryMap = new Map(deliveries.map(d => [String(d.orderId), d]));
      const mergedOrders = riderOrders.map(o => {
        const key = String(o.orderId);
        const match = deliveryMap.get(key);
        if (!match) return o;
        const expected = (() => {
          if (match.expectedAt) return match.expectedAt;
          if (Number.isFinite(match.expectedMinutes)) return { minutes: Number(match.expectedMinutes) };
          return o.expected_delivery_time;
        })();
        const actual = match.deliveredAt || o.actual_delivery_time;
        const distance = Number.isFinite(match.distanceKm) && match.distanceKm > 0 ? match.distanceKm : o.distance_km;
        return {
          ...o,
          expected_delivery_time: expected ?? o.expected_delivery_time ?? null,
          actual_delivery_time: actual ?? o.actual_delivery_time ?? null,
          distance_km: distance ?? o.distance_km ?? null,
          expectedMinutes: Number.isFinite(match.expectedMinutes) ? Number(match.expectedMinutes) : o.expectedMinutes,
          deliveredAt: match.deliveredAt || o.deliveredAt,
          durationMins: Number.isFinite(match.durationMins) ? Number(match.durationMins) : o.durationMins,
        };
      });
      const mergedIds = new Set(mergedOrders.map(o => String(o.orderId)));
      for (const delivery of deliveries){
        const key = String(delivery.orderId);
        if (mergedIds.has(key)) continue;
        mergedOrders.push({
          orderId: key,
          name: delivery.orderNumber || key,
          created_at: delivery.deliveredAt || delivery.expectedAt || null,
          expected_delivery_time: delivery.expectedAt ?? (Number.isFinite(delivery.expectedMinutes) ? { minutes: Number(delivery.expectedMinutes) } : null),
          actual_delivery_time: delivery.deliveredAt || null,
          current_status: delivery.status || null,
          shipping_address: null,
          distance_km: Number.isFinite(delivery.distanceKm) ? Number(delivery.distanceKm) : null,
          orders: undefined,
          deliveryDuration: undefined,
          expectedMinutes: Number.isFinite(delivery.expectedMinutes) ? Number(delivery.expectedMinutes) : undefined,
          deliveredAt: delivery.deliveredAt || undefined,
          durationMins: Number.isFinite(delivery.durationMins) ? Number(delivery.durationMins) : undefined,
        });
      }
      riderOrders = mergedOrders;

      const completed = deliveries.filter(d => d.deliveredAt && Number.isFinite(d.durationMins));
      // Total deliveries from rider.orders if available, else fallback to completed count
      const riderOrdersCount = Array.isArray(rider.orders) ? rider.orders.length : 0;
      const totalDeliveries = riderOrdersCount || completed.length;
      const avgDeliveryMins = completed.length ? Math.round(completed.reduce((a,d)=>a+(d.durationMins||0),0)/completed.length) : 0;

      // On-time rate calculation: check riders.orders array
      // Count all orders where current_status === 'delivered'
      const deliveredOrders = riderOrders.filter(o => String(o.current_status || '').toLowerCase() === 'delivered');
      const totalCount = deliveredOrders.length;
      // Count orders where onTime === true
      const onTimeCount = deliveredOrders.filter(o => o.onTime === true).length;
      // Calculate percentage
      const onTimeRate = totalCount > 0 ? Math.round((onTimeCount / totalCount) * 100) : 0;

      // Total KM from rider.totalDistance field (e.g., "16600.86 km")
      let totalKm = 0;
      if (rider.totalDistance) {
        const distanceStr = String(rider.totalDistance).trim();
        const match = distanceStr.match(/^([0-9]+(?:\.[0-9]+)?)/);
        if (match) {
          const value = parseFloat(match[1]);
          totalKm = Number.isFinite(value) ? Math.round(value) : 0;
        }
      }

      // Build history for last 10 days using actual delivered dates
      const historyMap = new Map();
      for (const d of completed){
        const day = d.deliveredAt ? (new Date(Date.parse(d.deliveredAt))).toISOString().slice(0,10) : null;
        if (!day) continue;
        if (!historyMap.has(day)) historyMap.set(day, { deliveries: 0, totalTime: 0, countTime: 0, distanceKm: 0 });
        const h = historyMap.get(day);
        h.deliveries += 1;
        if (Number.isFinite(d.durationMins)){ h.totalTime += d.durationMins; h.countTime += 1; }
      }

      const historyDates = Array.from({ length: 10 }).map((_,i)=>{
        const dt = new Date(); dt.setDate(dt.getDate() - (9 - i)); return dt.toISOString().slice(0,10);
      });
      const history = historyDates.map(date => {
        const h = historyMap.get(date) || { deliveries:0, totalTime:0, countTime:0, distanceKm:0 };
        return { date, deliveries: h.deliveries, avgTime: h.countTime ? Math.round(h.totalTime / h.countTime) : 0, distanceKm: h.distanceKm };
      });

      return res.json(ok({ rider, metrics: { totalDeliveries, avgDeliveryMins, onTimeRate, totalKm }, history, riderOrders }));
    }catch(e){
      log.error('rider.profile.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load rider profile'));
    }
  },
  exportOrders: async (req, res) => {
    try{
      const { q = '', status = 'all', created_at_min, created_at_max, from, to } = req.query || {};
      const fromTs = created_at_min || from ? (created_at_min || from) : null;
      const toTs = created_at_max || to ? (created_at_max || to) : null;

      // Base list from cached Shopify orders
      let cached = await orderModel.getAll();

      const ql = String(q).toLowerCase().trim();
      const normalizedStatus = normalizeStatus(status) || 'all';

      function getOrderStatus(o){ return normalizeStatus(o?.current_status); }

      const filtered = cached.filter(o => {
        if (normalizedStatus !== 'all' && getOrderStatus(o) !== normalizedStatus) return false;
        if (ql){
          const name = String(o.name || o.order_number || o.id || '').toLowerCase();
          const customer = String(o.full_name || o.customer?.full_name || '').toLowerCase();
          const addr = String((typeof o.shipping_address === 'string' ? o.shipping_address : (o.shipping_address?.address1 ? `${o.shipping_address.address1} ${o.shipping_address.city||''}` : JSON.stringify(o.shipping_address || o.billing_address || {}))) || '').toLowerCase();
          const text = `${name} ${customer} ${addr}`;
          if(!text.includes(ql)) return false;
        }
        if (fromTs || toTs){
          const t = o.created_at ? Date.parse(o.created_at) : null;
          if (!t) return false;
          if (fromTs && t < Date.parse(fromTs)) return false;
          if (toTs && t > Date.parse(toTs)) return false;
        }
        return true;
      });

      // Sort by created_at desc
      filtered.sort((a,b)=>{ const ta = a && a.created_at ? Date.parse(a.created_at) : 0; const tb = b && b.created_at ? Date.parse(b.created_at) : 0; return (Number.isFinite(tb)?tb:0) - (Number.isFinite(ta)?ta:0); });

      const db = getFirestore();
      const fsMap = new Map();
      if (db){
        try{
          for (const o of filtered){
            const orderId = String(o.orderId || o.id || o.name || o.order_number || '');
            if (!orderId) continue;
            try{ const snap = await db.collection('orders').doc(orderId).get(); if (snap.exists) fsMap.set(orderId, { ...snap.data(), __docId: String(snap.id) }); }catch(_){ }
          }
        }catch(_){ }
      }

      const merged = filtered.map(o => {
        const key = String(o.orderId || o.id || o.name || o.order_number || '');
        const f = fsMap.get(key);
        if (!f) return o;
        return {
          ...o,
          current_status: typeof f.current_status === 'string' ? f.current_status : o.current_status,
          full_name: (typeof f.full_name === 'string' && f.full_name) ? f.full_name : o.full_name,
          email: f.email ?? o.email,
          phone: f.phone ?? o.phone,
          shipping_address: f.shipping_address ?? o.shipping_address,
          billing_address: f.billing_address ?? o.billing_address,
          deliveryStartTime: f.deliveryStartTime ?? o.deliveryStartTime,
          deliveryEndTime: f.deliveryEndTime ?? o.deliveryEndTime,
          expected_delivery_time: f.expected_delivery_time ?? o.expected_delivery_time,
          expectedDeliveryTime: f.expectedDeliveryTime ?? o.expectedDeliveryTime,
          actual_delivery_time: f.actual_delivery_time ?? o.actual_delivery_time,
          actualDeliveryTime: f.actualDeliveryTime ?? o.actualDeliveryTime,
          delivery_events: Array.isArray(f.delivery_events) ? f.delivery_events : o.delivery_events,
          deliveryEvents: Array.isArray(f.deliveryEvents) ? f.deliveryEvents : o.deliveryEvents,
          events: Array.isArray(f.events) ? f.events : o.events,
          riderId: f.riderId ?? o.riderId,
          packed_by: f.packed_by ?? o.packed_by,
          paymentMethod: f.paymentMethod ?? o.paymentMethod,
          amount: f.amount ?? o.amount,
          orders: (() => {
            const base = (f && typeof f.orders === 'object') ? f.orders : o.orders;
            const hasBase = base && typeof base === 'object';
            const merged = hasBase ? { ...base } : {};
            if (f && (f.deliveryDuration !== undefined) && merged.deliveryDuration === undefined) {
              merged.deliveryDuration = f.deliveryDuration;
            }
            return hasBase || merged.deliveryDuration !== undefined ? merged : base;
          })(),
          deliveryDuration: (f && (f.deliveryDuration !== undefined)) ? f.deliveryDuration : o.deliveryDuration,
        };
      });

      // Reference data
      const assigns = await orderModel.listAssignments();
      const amap = new Map(assigns.map(a => [String(a.orderId), a]));
      const riders = await riderModel.list().catch(()=>[]);
      const rmap = new Map(riders.map(r => [String(r.id), r.name]));

      const packers = [];
      try{ if (db) { const psnap = await db.collection('packers').get(); psnap.forEach(doc=>{ const d = doc.data() || {}; packers.push({ id: doc.id, fullName: d.fullName || d.name || null }); }); } }catch(_){ }
      const pmap = new Map(packers.map(p => [String(p.id), p.fullName]));

      // Delivery events for filtered orders
      const evAll = await deliveryModel.listAll();
      const etaMap = new Map();
      const actualMap = new Map();
      const pageOrderIds = new Set(merged.map(o => String(o.orderId || o.id || o.name || o.order_number || '')));
      for (const { orderId, events } of evAll){
        if (!pageOrderIds.has(String(orderId)) || !Array.isArray(events)) continue;
        for (let i = events.length - 1; i >= 0; i--){ const ev = events[i]; if (!ev) continue; if (ev.type === 'eta' && !etaMap.has(String(orderId))) etaMap.set(String(orderId), ev); if (ev.type === 'delivered' && !actualMap.has(String(orderId))) actualMap.set(String(orderId), ev); if (etaMap.has(String(orderId)) && actualMap.has(String(orderId))) break; }
      }

      const withAssignments = merged.map(o => {
        const idKey = String(o.orderId || o.id || o.name || o.order_number || '');
        const assignment = amap.get(idKey) || null;
        const eta = etaMap.get(idKey) || null;
        const delivered = actualMap.get(idKey) || null;
        const resolvedExpected = (function(v,e){ if (e && e.expectedAt) return e.expectedAt; if (e && Number.isFinite(e.expectedMinutes)) return { minutes: Number(e.expectedMinutes) }; return v; })(o.expected_delivery_time, eta);

        const candidateRiderIds = [ assignment?.riderId, eta?.riderId, o.riderId, o.rider_id, o.riderID, o.assigned_to_id, (o.rider && typeof o.rider === 'object' ? o.rider.id : null) ].map(v => { if (v === undefined || v === null) return null; const str = String(v).trim(); return str ? str : null; });
        const normalizedRiderId = candidateRiderIds.find(Boolean) || null;

        const baseRiderText = (function(){ if (typeof assignment?.riderName === 'string' && assignment.riderName.trim()) return assignment.riderName.trim(); if (typeof o.rider === 'string' && o.rider.trim()) return o.rider.trim(); if (o.rider && typeof o.rider === 'object'){ const name = o.rider.name || o.rider.full_name || o.rider.fullName || null; if (typeof name === 'string' && name.trim()) return name.trim(); } if (typeof o.riderName === 'string' && o.riderName.trim()) return o.riderName.trim(); if (typeof o.rider_name === 'string' && o.rider_name.trim()) return o.rider_name.trim(); if (typeof o.assigned_to === 'string' && o.assigned_to.trim()) return o.assigned_to.trim(); return null; })();

        const resolvedRiderName = (function(){ if (typeof assignment?.riderName === 'string' && assignment.riderName.trim()) return assignment.riderName.trim(); if (normalizedRiderId){ const byMap = rmap.get(String(normalizedRiderId)); if (byMap) return byMap; } if (baseRiderText) return baseRiderText; if (normalizedRiderId) return String(normalizedRiderId); return null; })();

        const packedById = o.packed_by ? String(o.packed_by).trim() : null;
        const resolvedPackerName = packedById ? (pmap.get(packedById) || packedById) : null;

        const base = { ...o };
        return { ...base, assignment, riderId: normalizedRiderId, rider: resolvedRiderName, packed_by: packedById, packerName: resolvedPackerName, expected_delivery_time: resolvedExpected !== null ? resolvedExpected : (o.expected_delivery_time || null), actual_delivery_time: (o.deliveryEndTime || delivered?.at || o.actual_delivery_time || null) };
      });

      // Build CSV
      const header = ['Order','Customer','Address','Rider','Packer','Start','Expected','Actual','Amount','Payment Method','Status'];
      const rows = [ header.map(h=>`"${h.replace(/"/g,'""')}"`).join(',') ];
      for (const o of withAssignments){
        const orderId = o.name || o.order_number || o.id || '';
        const fullName = o.full_name || (o.customer && o.customer.full_name) || '';
        let addr = '-';
        if (typeof o.shipping_address === 'string' && String(o.shipping_address).trim()) addr = String(o.shipping_address).trim(); else if (o.shipping_address && typeof o.shipping_address === 'object') addr = [o.shipping_address.address1 || '', o.shipping_address.city || '', o.shipping_address.province || '', o.shipping_address.country || ''].map(s => String(s || '').trim()).filter(Boolean).join(', ') || '-'; else if (typeof o.billing_address === 'string' && String(o.billing_address).trim()) addr = String(o.billing_address).trim(); else if (o.billing_address && typeof o.billing_address === 'object') addr = [o.billing_address.address1 || '', o.billing_address.city || '', o.billing_address.province || '', o.billing_address.country || ''].map(s => String(s || '').trim()).filter(Boolean).join(', ') || '-';
        const riderLabel = o.rider ? String(o.rider) : (o.assignment?.riderId ? String(o.assignment.riderId) : 'Unassigned');
        const packerLabel = o.packerName || (o.packed_by ? String(o.packed_by) : '');
        const startTime = (()=>{ try{ if (o.deliveryStartTime) return String(o.deliveryStartTime); if (o.created_at) return String(o.created_at); return ''; }catch(_){ return ''; } })();
        const expectedTime = (()=>{ try{ if (o.expected_delivery_time && typeof o.expected_delivery_time === 'string') return String(o.expected_delivery_time); if (o.expected_delivery_time && typeof o.expected_delivery_time === 'object' && o.expected_delivery_time.minutes !== undefined) return String(o.expected_delivery_time.minutes); return ''; }catch(_){ return ''; } })();
        // Compute actual duration in minutes similar to client logic
        const computeMinutes = (ord) => {
          try{
            // Check numeric duration candidates
            const candidates = [ord.durationMins, ord.duration_minutes, ord.deliveryDuration, ord.delivery_duration, ord.actualDuration, ord.actual_duration, ord.actualDurationMinutes, ord.orders && ord.orders.deliveryDuration, ord.orders && ord.orders.delivery_duration, ord.orders && ord.orders.durationMins, ord.orders && ord.orders.duration_minutes, ord.orders && ord.orders.actualDuration, ord.orders && ord.orders.actualDurationMinutes];
            for (const c of candidates){
              if (c === null || c === undefined) continue;
              if (typeof c === 'number' && Number.isFinite(c)) return Math.round(c);
              if (typeof c === 'string'){
                const t = c.trim();
                if (!t) continue;
                const mMatch = t.match(/^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i);
                if (mMatch) return Math.round(Number(mMatch[1]));
                const sMatch = t.match(/^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i);
                if (sMatch) return Math.round(Number(sMatch[1]) / 60);
                const num = Number(t);
                if (Number.isFinite(num)) return Math.round(num);
              }
              if (typeof c === 'object' && c !== null){
                if (Number.isFinite(c.minutes)) return Math.round(Number(c.minutes));
                if (Number.isFinite(c.expectedMinutes)) return Math.round(Number(c.expectedMinutes));
                if (Number.isFinite(c.seconds)) return Math.round(Number(c.seconds) / 60);
              }
            }
            // Fallback: compute from timestamps
            const toDate = (v) => {
              if (v === null || v === undefined) return null;
              if (v instanceof Date) return v;
              if (typeof v === 'number'){
                if (!Number.isFinite(v)) return null;
                if (v > 1e12) return new Date(v);
                if (v > 1e9) return new Date(v * 1000);
              }
              if (typeof v === 'string'){
                const parsed = Date.parse(v);
                if (!Number.isNaN(parsed)) return new Date(parsed);
              }
              if (typeof v === 'object'){
                if (v.seconds !== undefined) return new Date(Number(v.seconds) * 1000);
                if (v.at) return toDate(v.at);
              }
              return null;
            };
            const delivered = toDate(ord.actual_delivery_time || ord.actualDeliveryTime || ord.deliveryEndTime || (ord.events && ord.events.find(e=>e && e.type==='delivered') && ord.events.reverse()[0] && ord.events.reverse()[0].at));
            const start = toDate(ord.deliveryStartTime || ord.delivery_start_time || ord.start_time || ord.startTime || ord.started_at || ord.startedAt || ord.created_at);
            if (delivered && start){
              const diff = Math.round((delivered.getTime() - start.getTime()) / 60000);
              if (diff >= 0) return diff;
            }
          }catch(_){ }
          return null;
        };
        const minutes = computeMinutes(o);
        let actualDisplay = '';
        if (minutes === null) actualDisplay = '';
        else if (minutes < 60) actualDisplay = `${minutes} min`;
        else { const hrs = Math.floor(minutes / 60); const rem = minutes % 60; actualDisplay = `${hrs}h ${rem}m`; }
        const amount = o.amount || o.assignment?.amount || '';
        const payment = o.paymentMethod || o.assignment?.paymentMethod || '';
        const statusRaw = (o.current_status || o.order_status || o.status || '').toString();
        const cols = [orderId, fullName, addr, riderLabel, packerLabel, startTime, expectedTime, actualDisplay, amount, payment, statusRaw];
        rows.push(cols.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(','));
      }

      const csv = rows.join('\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      const filename = `orders_${fromTs||'all'}_${toTs||'all'}.csv`;
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.send(csv);

    }catch(e){ log.error('orders.export.failed', { message: e?.message }); return res.status(500).json(fail('Failed to export orders')); }
  },
  orders: async (req, res) => {
    try{
      const { q = '', status = 'all', created_at_min, created_at_max, page = '1', limit = '20' } = req.query || {};
      const pageNum = parseIntParam(page, 1);
      const limitNum = parseIntParam(limit, 20);

      // Base list from cached Shopify orders (redis/in-memory); if empty, fetch fresh
      let cached = await orderModel.getAll();
      if (!cached.length) {
        const { orders = [], error } = await listOrders({ limit: 100 });
        if (error) log.warn('orders.fetch.error', { error });
        await orderModel.upsertMany(orders);
        cached = await orderModel.getAll();
      }

      // Get only Firestore docs for orders we need (after pagination), not all of them
      const ql = String(q).toLowerCase().trim();
      const normalizedStatus = normalizeStatus(status) || 'all';
      function getOrderStatus(o){
        return normalizeStatus(o?.current_status);
      }
      const fromTs = created_at_min ? Date.parse(created_at_min) : null;
      const toTs = created_at_max ? Date.parse(created_at_max) : null;

      // Filter and sort before pagination
      const filtered = cached.filter(o => {
        if (normalizedStatus !== 'all' && getOrderStatus(o) !== normalizedStatus) return false;
        if (ql){
          const name = String(o.name || o.order_number || o.id || '').toLowerCase();
          const customer = String(o.full_name || o.customer?.full_name || '').toLowerCase();
          const addr = String((typeof o.shipping_address === 'string' ? o.shipping_address : (o.shipping_address?.address1 ? `${o.shipping_address.address1} ${o.shipping_address.city||''}` : JSON.stringify(o.shipping_address || o.billing_address || {}))) || '').toLowerCase();
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

      // Sort filtered results by created_at descending (latest first)
      filtered.sort((a, b) => {
        const ta = a && a.created_at ? Date.parse(a.created_at) : 0;
        const tb = b && b.created_at ? Date.parse(b.created_at) : 0;
        return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
      });

      // Paginate BEFORE fetching enrichment data from Firestore
      const { items, meta } = paginate(filtered, pageNum, limitNum);

      // Now fetch Firestore docs only for paginated items
      const db = getFirestore();
      const fsMap = new Map();
      if (db) {
        try {
          for (const o of items) {
            const orderId = String(o.orderId || o.id || o.name || o.order_number || '');
            if (!orderId) continue;
            try {
              const snap = await db.collection('orders').doc(orderId).get();
              if (snap.exists) {
                fsMap.set(orderId, { ...snap.data(), __docId: String(snap.id) });
              }
            } catch (e) {
              // Skip individual doc fetch errors
            }
          }
        } catch (e) {
          log.warn('firestore.batch.fetch.failed', { message: e?.message });
        }
      }

      // Merge Firestore data into cached items
      const merged = items.map(o => {
        const key = String(o.orderId || o.id || o.name || o.order_number || '');
        const f = fsMap.get(key);
        if (!f) return o;
        return {
          ...o,
          current_status: typeof f.current_status === 'string' ? f.current_status : o.current_status,
          full_name: (typeof f.full_name === 'string' && f.full_name) ? f.full_name : o.full_name,
          email: f.email ?? o.email,
          phone: f.phone ?? o.phone,
          shipping_address: f.shipping_address ?? o.shipping_address,
          billing_address: f.billing_address ?? o.billing_address,
          deliveryStartTime: f.deliveryStartTime ?? o.deliveryStartTime,
          deliveryEndTime: f.deliveryEndTime ?? o.deliveryEndTime,
          expected_delivery_time: f.expected_delivery_time ?? o.expected_delivery_time,
          expectedDeliveryTime: f.expectedDeliveryTime ?? o.expectedDeliveryTime,
          expected_time: f.expected_time ?? o.expected_time,
          expectedTime: f.expectedTime ?? o.expectedTime,
          actual_delivery_time: f.actual_delivery_time ?? o.actual_delivery_time,
          actualDeliveryTime: f.actualDeliveryTime ?? o.actualDeliveryTime,
          delivery_events: Array.isArray(f.delivery_events) ? f.delivery_events : o.delivery_events,
          deliveryEvents: Array.isArray(f.deliveryEvents) ? f.deliveryEvents : o.deliveryEvents,
          events: Array.isArray(f.events) ? f.events : o.events,
          riderId: f.riderId ?? o.riderId,
          packed_by: f.packed_by ?? o.packed_by,
          paymentMethod: f.paymentMethod ?? o.paymentMethod,
          amount: f.amount ?? o.amount,
          orders: (() => {
            const base = (f && typeof f.orders === 'object') ? f.orders : o.orders;
            const hasBase = base && typeof base === 'object';
            const merged = hasBase ? { ...base } : {};
            if (f && (f.deliveryDuration !== undefined) && merged.deliveryDuration === undefined) {
              merged.deliveryDuration = f.deliveryDuration;
            }
            return hasBase || merged.deliveryDuration !== undefined ? merged : base;
          })(),
          deliveryDuration: (f && (f.deliveryDuration !== undefined)) ? f.deliveryDuration : o.deliveryDuration,
        };
      });

      // Fetch reference data (riders, packers, assignments) ONLY for the paginated items
      const assigns = await orderModel.listAssignments();
      const amap = new Map(assigns.map(a => [String(a.orderId), a]));
      const riders = await riderModel.list().catch(()=>[]);
      const rmap = new Map(riders.map(r => [String(r.id), r.name]));

      const packers = [];
      try{
        if (db) {
          const psnap = await db.collection('packers').get();
          psnap.forEach(doc => {
            const d = doc.data() || {};
            packers.push({ id: doc.id, fullName: d.fullName || d.name || null });
          });
        }
      }catch(_){ /* ignore packer load errors */ }
      const pmap = new Map(packers.map(p => [String(p.id), p.fullName]));

      // Fetch delivery events only for items on this page
      const evAll = await deliveryModel.listAll();
      const etaMap = new Map();
      const actualMap = new Map();
      const pageOrderIds = new Set(merged.map(o => String(o.orderId || o.id || o.name || o.order_number || '')));
      for (const { orderId, events } of evAll){
        if (!pageOrderIds.has(String(orderId)) || !Array.isArray(events)) continue;
        for (let i = events.length - 1; i >= 0; i--){
          const ev = events[i];
          if (!ev) continue;
          if (ev.type === 'eta' && !etaMap.has(String(orderId))) etaMap.set(String(orderId), ev);
          if (ev.type === 'delivered' && !actualMap.has(String(orderId))) actualMap.set(String(orderId), ev);
          if (etaMap.has(String(orderId)) && actualMap.has(String(orderId))) break;
        }
      }

      const withAssignments = merged.map(o => {
        const idKey = String(o.orderId || o.id || o.name || o.order_number || '');
        const assignment = amap.get(idKey) || null;
        const eta = etaMap.get(idKey) || null;
        const delivered = actualMap.get(idKey) || null;
        const resolvedExpected = resolveExpectedDeliveryValue(o, eta);

        const candidateRiderIds = [
          assignment?.riderId,
          eta?.riderId,
          o.riderId,
          o.rider_id,
          o.riderID,
          o.assigned_to_id,
          (o.rider && typeof o.rider === 'object' ? o.rider.id : null),
        ].map(v => {
          if (v === undefined || v === null) return null;
          const str = String(v).trim();
          return str ? str : null;
        });
        const normalizedRiderId = candidateRiderIds.find(Boolean) || null;

        const baseRiderText = (() => {
          if (typeof assignment?.riderName === 'string' && assignment.riderName.trim()) return assignment.riderName.trim();
          if (typeof o.rider === 'string' && o.rider.trim()) return o.rider.trim();
          if (o.rider && typeof o.rider === 'object'){
            const name = o.rider.name || o.rider.full_name || o.rider.fullName || null;
            if (typeof name === 'string' && name.trim()) return name.trim();
          }
          if (typeof o.riderName === 'string' && o.riderName.trim()) return o.riderName.trim();
          if (typeof o.rider_name === 'string' && o.rider_name.trim()) return o.rider_name.trim();
          if (typeof o.assigned_to === 'string' && o.assigned_to.trim()) return o.assigned_to.trim();
          return null;
        })();

        const resolvedRiderName = (() => {
          if (typeof assignment?.riderName === 'string' && assignment.riderName.trim()) return assignment.riderName.trim();
          if (normalizedRiderId){
            const byMap = rmap.get(String(normalizedRiderId));
            if (byMap) return byMap;
          }
          if (baseRiderText) return baseRiderText;
          if (normalizedRiderId) return String(normalizedRiderId);
          return null;
        })();

        const packedById = o.packed_by ? String(o.packed_by).trim() : null;
        const resolvedPackerName = packedById ? (pmap.get(packedById) || packedById) : null;

        const base = { ...o };
        return {
          ...base,
          assignment,
          riderId: normalizedRiderId,
          rider: resolvedRiderName,
          packed_by: packedById,
          packerName: resolvedPackerName,
          expected_delivery_time: resolvedExpected !== null ? resolvedExpected : (o.expected_delivery_time || null),
          actual_delivery_time: (o.deliveryEndTime || delivered?.at || o.actual_delivery_time || null),
        };
      });

      return res.json(ok({ orders: withAssignments, shopifyError: null, shopifyConfigured: isConfigured() }, meta));
    }catch(e){
      log.error('orders.list.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load orders'));
    }
  },
  reports: async (req, res) => {
    try{
      const riders = await riderModel.list();
      const orders = await orderModel.getAll();
      const assigns = await orderModel.listAssignments();
      const aMap = new Map(assigns.map(a => [String(a.orderId), a]));
      const evAll = await deliveryModel.listAll();
      const eMap = new Map(evAll.map(e => [String(e.orderId), Array.isArray(e.events)?e.events:[]]));

      function parseIso(s){ const t = Date.parse(s); return Number.isFinite(t) ? new Date(t) : null; }
      function lastOf(list, type){
        for(let i=list.length-1;i>=0;i--){ if(list[i] && list[i].type === type) return list[i]; }
        return null;
      }

      const deliveries = [];
      for (const { orderId, events } of evAll){
        const id = String(orderId);
        const order = orders.find(o => String(o.id||o.name||o.order_number) === id) || null;
        const assignment = aMap.get(id) || null;
        const etaEv = lastOf(events, 'eta');
        const ofdEv = lastOf(events, 'out_for_delivery');
        const pickupEv = lastOf(events, 'pickup');
        const deliveredEv = lastOf(events, 'delivered');
        const startAt = ofdEv?.at || pickupEv?.at || (order?.created_at || null);
        const deliveredAt = deliveredEv?.at || null;
        let durationMins = null;
        if (startAt && deliveredAt){
          const t1 = Date.parse(startAt); const t2 = Date.parse(deliveredAt);
          if (Number.isFinite(t1) && Number.isFinite(t2) && t2 >= t1) durationMins = Math.round((t2 - t1) / 60000);
        }
        const status = deliveredAt ? 'delivered' : (ofdEv ? 'in_progress' : (assignment ? 'assigned' : 'new'));
        deliveries.push({
          orderId: id,
          orderNumber: order?.name || order?.order_number || id,
          riderId: assignment?.riderId || etaEv?.riderId || ofdEv?.riderId || pickupEv?.riderId || deliveredEv?.riderId || null,
          expectedMinutes: etaEv?.expectedMinutes ?? null,
          expectedAt: etaEv?.expectedAt ?? null,
          deliveredAt,
          durationMins,
          status,
        });
      }

      const completed = deliveries.filter(d => d.deliveredAt && Number.isFinite(d.durationMins));
      const totalDeliveries = completed.length;
      const avgDeliveryMins = completed.length ? Math.round(completed.reduce((a, d) => a + (d.durationMins || 0), 0) / completed.length) : 0;

      return res.json(ok({ metrics: { totalDeliveries, avgDeliveryMins }, deliveries, orders }));
    }catch(e){
      log.error('reports.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load reports'));
    }
  },

  getOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const assignment = await orderModel.getAssignment(found.key);
    return res.json(ok({ order: { ...found.order, assignment: assignment || null } }));
  },

  addDeliveryEvent: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const { type, riderId = null, timestamp = null, expectedMinutes = null, notes = null } = req.body || {};
    if (!type) return res.status(400).json(fail('Missing body.type'));
    const ev = await deliveryModel.addEvent(id, { type, riderId, at: timestamp, expectedMinutes, notes });
    if (!ev) return res.status(400).json(fail('Invalid event'));
    log.info('delivery.event.added', { orderId: id, type: ev.type, at: ev.at });
    return res.json(ok({ event: ev }));
  },

  getDeliveryEvents: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const events = await deliveryModel.getEvents(id);
    return res.json(ok({ events }));
  },

  seedOrder: async (req, res) => {
    try{
      const id = String(req.body?.id || `TEST-${Date.now()}`);
      const order = {
        id,
        name: id,
        order_number: id,
        created_at: new Date().toISOString(),
        fulfillment_status: 'open',
        full_name: 'Test Customer',
        shipping_address: { address1: '123 Demo St', city: 'Demo City', province: 'DC', country: 'US' },
        tags: ['seed'],
      };
      await orderModel.upsertMany([order]);
      try{
        const db = getFirestore();
        if (db) {
          const id = String(order.id);
          const ref = db.collection('orders').doc(id);
          const shipping = order.shipping_address || {};
          const billing = order.billing_address || {};
          const client = order.client_details || {};
          const shippingStr = [shipping.address1 || '', shipping.city || '', shipping.province || '', shipping.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
          const billingStr = [billing.address1 || '', billing.city || '', billing.province || '', billing.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
          const payload = {
            orderId: id,
            order_number: order.order_number || null,
            name: order.name || null,
            phone: order.phone || billing.phone || shipping.phone || null,
            email: order.email || client.contact_email || null,
            riderId: null,
            packed_by: null,
            shipping_address: shippingStr,
            billing_address: billingStr,
            latitude: (billing.latitude !== undefined ? Number(billing.latitude) : (shipping.latitude !== undefined ? Number(shipping.latitude) : undefined)),
            longitude: (billing.longitude !== undefined ? Number(billing.longitude) : (shipping.longitude !== undefined ? Number(shipping.longitude) : undefined)),
            cancel_reason: order.cancel_reason || null,
            cancelled_at: order.cancelled_at || null,
            client_details_confirmed: (client.confirmed !== undefined ? client.confirmed : (order.confirmed !== undefined ? order.confirmed : null)),
            notes: order.note || null,
            created_at: order.created_at || null,
            order_status: 'new',
            current_status: 'new',
            // Custom delivery time fields for seeded orders
            expected_delivery_time: null,
            actual_delivery_time: null,
          };
          payload.latitude = (payload.latitude !== undefined && Number.isFinite(payload.latitude)) ? payload.latitude : null;
          payload.longitude = (payload.longitude !== undefined && Number.isFinite(payload.longitude)) ? payload.longitude : null;
          await ref.set(payload, { merge: true });
        }
      }catch(_){}
      return res.json(ok({ order }));
    }catch(e){
      log.error('seed.order.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to seed order'));
    }
  },

  // Admin sync disabled: only Shopify webhooks write orders to Firestore
  syncOrders: async (req, res) => {
    try{
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore not configured'));

      const snap = await db.collection('orders').get();
      let processed = 0, updated = 0, errors = 0;

      function deriveStatus(o){
        const normalized = normalizeStatus(o?.current_status);
        if (normalized === 'assigned' || normalized === 'delivered' || normalized === 'new' || normalized === 'in_progress') return normalized;
        return 'new';
      }

      for (const doc of snap.docs){
        processed += 1;
        try{
          const data = doc.data() || {};
          const payload = { orderId: data.orderId || doc.id };
          // Backfill nullable fields
          if (!Object.prototype.hasOwnProperty.call(data, 'expected_delivery_time')) payload.expected_delivery_time = null;
          if (!Object.prototype.hasOwnProperty.call(data, 'actual_delivery_time')) payload.actual_delivery_time = null;
          if (!Object.prototype.hasOwnProperty.call(data, 'order_status')) payload.order_status = 'new';
          if (!Object.prototype.hasOwnProperty.call(data, 'packed_by')) payload.packed_by = null;
          const nextStatus = deriveStatus(data);
          if (data.current_status !== nextStatus) payload.current_status = nextStatus;
          if (Object.keys(payload).length > 1){
            await doc.ref.set(payload, { merge: true });
            updated += 1;
          }
        }catch(_){ errors += 1; }
      }

      return res.json(ok({ processed, updated, errors }));
    }catch(e){
      return res.status(500).json(fail('Sync failed', null, { message: e?.message }));
    }
  },

  assignOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const id = found.key;
    const { riderId, paymentMethod, amount } = req.body || {};
    const rider = await riderModel.getById(riderId);
    if (!rider) return res.status(400).json(fail('Invalid rider'));
    const assignment = await orderModel.assign(id, riderId);

    // Save payment method and amount to Firestore
    try {
      const db = getFirestore();
      if (db) {
        const updateData = { orderId: id };
        if (paymentMethod) updateData.paymentMethod = String(paymentMethod).trim();
        if (amount) updateData.amount = String(amount).trim();
        await db.collection('orders').doc(id).set(updateData, { merge: true });
      }
    } catch (e) {
      log.warn('firestore.payment.save.failed', { message: e?.message });
    }

    log.info('order.assigned', { orderId: id, riderId, paymentMethod, amount });
    return res.json(ok({ assignment }));
  },

  unassignOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const id = found.key;

    // Fetch the order from Firestore to get complete rider information
    let riderIdFromFirestore = null;
    try {
      const db = getFirestore();
      if (db) {
        const snap = await db.collection('orders').doc(id).get();
        if (snap.exists) {
          const fsData = snap.data() || {};
          riderIdFromFirestore = normalizeRiderIdFromOrder(fsData);
        }
      }
    } catch (e) {
      log.warn('firestore.order.fetch.failed', { orderId: id, message: e?.message });
    }

    // Use Firestore riderId if available, otherwise fall back to cached order
    const riderId = riderIdFromFirestore || normalizeRiderIdFromOrder(found.order);

    // Unassign the order from rider
    await orderModel.unassign(id);

    // Add order to rider's unAssignedOrders array (riders.orders only contains completed orders)
    if (riderId) {
      try {
        const db = getFirestore();
        if (db) {
          const admin = initFirebaseAdmin();
          const riderRef = db.collection('riders').doc(String(riderId));

          if (admin && admin.firestore && admin.firestore.FieldValue) {
            const FV = admin.firestore.FieldValue;
            // Add to unAssignedOrders array only (don't remove from orders as assigned orders are not in orders array)
            await riderRef.set({
              unAssignedOrders: FV.arrayUnion(id),
              updatedAt: new Date().toISOString(),
            }, { merge: true });
            log.info('firestore.rider.unassigned.array.created', { riderId: String(riderId), orderId: id });
          } else {
            // Fallback: manual update (not atomic)
            const snap = await riderRef.get();
            const data = snap.exists ? (snap.data() || {}) : {};
            const unAssignedOrders = Array.isArray(data.unAssignedOrders) ? data.unAssignedOrders.slice() : [];

            // Add to unAssignedOrders if not already present
            if (!unAssignedOrders.map(String).includes(String(id))) {
              unAssignedOrders.push(id);
            }

            await riderRef.set({
              unAssignedOrders: unAssignedOrders,
              updatedAt: new Date().toISOString(),
            }, { merge: true });
            log.info('firestore.rider.unassigned.array.created.fallback', { riderId: String(riderId), orderId: id });
          }
        }
      } catch (e) {
        log.error('firestore.rider.unassigned.array.failed', { riderId: String(riderId), orderId: id, message: e?.message });
      }
    } else {
      log.warn('firestore.rider.unassigned.skipped', { orderId: id, message: 'No rider found for order' });
    }

    log.info('order.unassigned', { orderId: id, riderId });
    return res.json(ok({ ok: true }));
  },
};
