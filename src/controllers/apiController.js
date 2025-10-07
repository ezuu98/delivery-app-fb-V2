const orderModel = require('../models/orderModel');
const riderModel = require('../models/riderModel');
const deliveryModel = require('../models/deliveryModel');
const { getFirestore } = require('../services/firestore');
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

async function computeRiderAssignmentCounts(){
  // returns Map<riderId, { total: number, months: Map<'YYYY-MM', number> }>
  // Totals represent kilometers traveled (sum of per-order distance)
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
      const m = new Map();
      for(const k of monthKeys) m.set(k, 0);
      counts.set(riderId, { total: 0, months: m });
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
        // determine month key from created_at or other date fields
        const created = data.created_at || data.createdAt || data.created || null;
        const dd = toDateOrNull(created);
        if (dd){
          const k = monthKeyLocal(dd);
          if (entry.months.has(k)) entry.months.set(k, (entry.months.get(k) || 0) + addKm);
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
      if (orderId) seenOrders.add(orderId);
      const created = order?.created_at || order?.createdAt || order?.created || null;
      const dd = toDateOrNull(created);
      if (dd){
        const k = monthKeyLocal(dd);
        if (entry.months.has(k)) entry.months.set(k, (entry.months.get(k) || 0) + addKm);
      }
    }
  }catch(e){
    log.warn('riders.count.orders.cache.failed', { message: e?.message });
  }

  return counts;
}

module.exports = {
  riders: async (req, res) => {
    const { q = '', status = 'all', lastDays = 'all', page = '1', limit = '20' } = req.query || {};
    const list = await riderModel.list();
    const counts = list.length ? await computeRiderAssignmentCounts() : new Map();
    const withTotals = list.map(r => {
      const key = String(r.id || '').trim();
      const entry = counts.get(key) || { total: 0, months: new Map() };
      // convert months map to plain object { 'YYYY-MM': count }
      const monthsObj = {};
      if (entry.months && typeof entry.months.forEach === 'function'){
        entry.months.forEach((v,k)=>{ monthsObj[k] = v; });
      }
      return { ...r, assignedOrders: entry.total || 0, monthlyCounts: monthsObj };
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
      const riderOrderIds = Array.isArray(rider.orders) ? rider.orders.map(v=>String(v)) : [];
      const riderOrders = [];
      try{
        const db = getFirestore();
        for (const oid of riderOrderIds){
          const fromCache = orders.find(o => String(o.id||o.name||o.order_number) === oid) || null;
          let fromFs = null;
          if (!fromCache && db) {
            try{ const snap = await db.collection('orders').doc(oid).get(); if (snap && snap.exists) fromFs = snap.data() || null; }catch(_){ }
          }
          const base = fromCache || fromFs || { orderId: oid, name: oid };
          riderOrders.push({
            orderId: String(base.orderId || base.id || base.name || base.order_number || oid),
            name: base.name || base.order_number || String(oid),
            created_at: base.created_at || null,
            expected_delivery_time: base.expected_delivery_time ?? base.expectedDeliveryTime ?? null,
            actual_delivery_time: base.actual_delivery_time ?? base.actualDeliveryTime ?? null,
            current_status: base.current_status || base.order_status || null,
            shipping_address: base.shipping_address || null,
            distance_km: base.distance_km ?? base.distanceKm ?? null,
            orders: base.orders || undefined,
            deliveryDuration: base.deliveryDuration !== undefined ? base.deliveryDuration : undefined,
          });
        }
      }catch(_){ }

      function lastOf(list, type){
        for(let i=list.length-1;i>=0;i--){ if(list[i] && list[i].type === type) return list[i]; }
        return null;
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
        });
      }

      const completed = deliveries.filter(d => d.deliveredAt && Number.isFinite(d.durationMins));
      // Total deliveries from rider.orders if available, else fallback to completed count
      const riderOrdersCount = Array.isArray(rider.orders) ? rider.orders.length : 0;
      const totalDeliveries = riderOrdersCount || completed.length;
      const avgDeliveryMins = completed.length ? Math.round(completed.reduce((a,d)=>a+(d.durationMins||0),0)/completed.length) : 0;

      // On-time rate = (# deliveries where actual < expected) / total deliveries * 100
      const eligible = deliveries.filter(d => Number.isFinite(d.durationMins) && Number.isFinite(d.expectedMinutes));
      const onTimeCount = eligible.filter(d => d.durationMins < d.expectedMinutes).length;
      const onTimeRate = totalDeliveries ? Math.round((onTimeCount / totalDeliveries) * 100) : 0;

      const totalKm = (typeof rider.totalKm === 'number' && Number.isFinite(rider.totalKm)) ? rider.totalKm : (Number.isFinite(Number(rider.total_kms)) ? Number(rider.total_kms) : 0);

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
  orders: async (req, res) => {
    try{
      const { q = '', status = 'all', created_at_min, created_at_max, page = '1', limit = '20' } = req.query || {};

      // Fetch Firestore docs (authoritative for current_status/time fields)
      let fsDocs = [];
      try{
        const db = getFirestore();
        if (db) {
          const snap = await db.collection('orders').get();
          snap.forEach(doc => { const d = doc.data() || {}; fsDocs.push({ ...d, __docId: String(doc.id) }); });
        }
      }catch(e){ /* firestore might not be available */ }
      const fsMap = new Map(fsDocs.map(d => [String(d.orderId || d.id || d.name || d.order_number || d.__docId || ''), d]));

      // Base list from cached Shopify orders (redis/in-memory); if empty, fallback to Firestore list
      let cached = await orderModel.getAll();
      if (!cached.length && fsDocs.length) cached = fsDocs.slice();
      if (!cached.length) {
        const { orders = [], error } = await listOrders({ limit: 100 });
        if (error) log.warn('orders.fetch.error', { error });
        await orderModel.upsertMany(orders);
        cached = await orderModel.getAll();
      }

      // Overlay Firestore status/time onto cached items when available and include FS-only docs
      const seen = new Set();
      const merged = cached.map(o => {
        const key = String(o.orderId || o.id || o.name || o.order_number || '');
        seen.add(key);
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
          // Pass-through nested Firestore 'orders' object (e.g., orders.deliveryDuration)
          orders: (() => {
            const base = (f && typeof f.orders === 'object') ? f.orders : o.orders;
            const hasBase = base && typeof base === 'object';
            const merged = hasBase ? { ...base } : {};
            if (f && (f.deliveryDuration !== undefined) && merged.deliveryDuration === undefined) {
              merged.deliveryDuration = f.deliveryDuration;
            }
            return hasBase || merged.deliveryDuration !== undefined ? merged : base;
          })(),
          // Also expose a top-level convenience field if present in Firestore
          deliveryDuration: (f && (f.deliveryDuration !== undefined)) ? f.deliveryDuration : o.deliveryDuration,
        };
      });
      for (const [key, f] of fsMap.entries()){
        if (!seen.has(key)) merged.push(f);
      }
      cached = merged;

      const ql = String(q).toLowerCase().trim();
      const normalizedStatus = normalizeStatus(status) || 'all';
      function getOrderStatus(o){
        return normalizeStatus(o?.current_status);
      }
      const fromTs = created_at_min ? Date.parse(created_at_min) : null;
      const toTs = created_at_max ? Date.parse(created_at_max) : null;


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

      const { items, meta } = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));

      const assigns = await orderModel.listAssignments();
      const amap = new Map(assigns.map(a => [String(a.orderId), a]));
      const riders = await riderModel.list().catch(()=>[]);
      const rmap = new Map(riders.map(r => [String(r.id), r.name]));

      // Merge delivery events (expected times and actual delivered time) into orders
      const evAll = await deliveryModel.listAll();
      const etaMap = new Map();
      const actualMap = new Map();
      for (const { orderId, events } of evAll){
        if (!orderId || !Array.isArray(events)) continue;
        // find last 'eta' event and last 'delivered' event
        for (let i = events.length - 1; i >= 0; i--){
          const ev = events[i];
          if (!ev) continue;
          if (ev.type === 'eta' && !etaMap.has(String(orderId))) etaMap.set(String(orderId), ev);
          if (ev.type === 'delivered' && !actualMap.has(String(orderId))) actualMap.set(String(orderId), ev);
          if (etaMap.has(String(orderId)) && actualMap.has(String(orderId))) break;
        }
      }

      const withAssignments = items.map(o => {
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

        const base = { ...o };
        return {
          ...base,
          assignment,
          riderId: normalizedRiderId,
          rider: resolvedRiderName,
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
    const { riderId } = req.body || {};
    const rider = await riderModel.getById(riderId);
    if (!rider) return res.status(400).json(fail('Invalid rider'));
    const assignment = await orderModel.assign(id, riderId);
    log.info('order.assigned', { orderId: id, riderId });
    return res.json(ok({ assignment }));
  },

  unassignOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const id = found.key;
    await orderModel.unassign(id);
    log.info('order.unassigned', { orderId: id });
    return res.json(ok({ ok: true }));
  },
};
