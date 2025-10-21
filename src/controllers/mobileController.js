const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { getFirestore } = require('../services/firestore');
const { ok, fail, stdOk, stdFail } = require('../utils/response');
const { getClientConfig } = require('./firebaseAuthController');
const orderModel = require('../models/orderModel');
const deliveryModel = require('../models/deliveryModel');
const { paginate, parseIntParam } = require('../utils/pagination');

async function verifyBearer(req){
  const admin = initFirebaseAdmin();
  if (!admin) return null;
  const h = req.headers && req.headers.authorization;
  if (!h || !/^bearer\s+/i.test(h)) return null;
  const token = h.split(/\s+/)[1];
  if (!token) return null;
  try { return await admin.auth().verifyIdToken(token); } catch { return null; }
}

function getApiKey(){
  const cfg = getClientConfig();
  return (cfg && cfg.apiKey) || process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '';
}

function normalizeStatus(value){
  if (typeof value !== 'string') return '';
  const normalized = value.toLowerCase().trim().replace(/[\s-]+/g, '_');
  if (normalized === 'in_transit') return 'in_progress';
  return normalized;
}

async function upsertRider({ uid, email, displayName, contactNumber, photoURL, password }){
  const db = getFirestore();
  if (!db) return null;
  const now = new Date().toISOString();
  const docRef = db.collection('riders').doc(uid);
  const snap = await docRef.get();
  const existing = snap.exists ? (snap.data() || {}) : {};
  const payload = { uid, updatedAt: now };
  if (!snap.exists) payload.createdAt = now;
  if (email !== undefined) payload.email = email;
  if (displayName !== undefined) payload.displayName = displayName;
  if (contactNumber !== undefined) payload.contactNumber = contactNumber;
  if (photoURL !== undefined) payload.photoURL = photoURL;
  // Initialize new aggregated fields when creating a rider
  if (!snap.exists) {
    payload.total_kms = 0;
    payload.this_month_kms = 0;
    payload.orders = [];
  }
  // WARNING: storing plain passwords is insecure. This field stores the non-encrypted password for mobile app compatibility as requested.
  if (password !== undefined) payload.plainPassword = password;
  await docRef.set(payload, { merge: true });
  // Backfill defaults on existing docs without the new fields
  const needsDefaults = (existing.total_kms === undefined) || (existing.this_month_kms === undefined) || !Array.isArray(existing.orders);
  if (needsDefaults) {
    const defaults = {};
    if (existing.total_kms === undefined) defaults.total_kms = 0;
    if (existing.this_month_kms === undefined) defaults.this_month_kms = 0;
    if (!Array.isArray(existing.orders)) defaults.orders = [];
    await docRef.set(defaults, { merge: true });
  }
  const doc = await docRef.get();
  return { id: uid, ...doc.data() };
}

module.exports = {
  // Register with email/password via Firebase REST when email provided; otherwise use Firebase Admin to create user without email.
  register: async (req, res) => {
    try{
      const { email, password, fullName = null, contactNumber = null } = req.body || {};
      const pw = password ? String(password) : '';
      if (!pw) return res.status(400).json(stdFail('Missing password', 400));
      const fn = String(fullName || '').trim();
      const cn = String(contactNumber || '').trim();
      const digits = cn.replace(/\D+/g,'');
      if (!fn || !cn) return res.status(400).json(stdFail('Missing fullName/contactNumber', 400));
      if (digits.length !== 10) return res.status(400).json(stdFail('numbers should be 10 digit', 400));

      let localId = null;
      const em = email ? String(email).trim() : '';

      if (em) {
        // Use Firebase REST signUp when an email is provided
        const key = getApiKey();
        if (!key) return res.status(500).json(stdFail('Firebase not configured', 500));
        const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(key)}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: em, password: pw, displayName: fn || undefined, returnSecureToken: true })
        });
        const data = await resp.json().catch(()=>({}));
        if (!resp.ok || !data.localId) {
          const msg = data && (data.error && data.error.message ? data.error.message : JSON.stringify(data));
          return res.status(400).json(stdFail(msg || 'Registration failed', 400));
        }
        localId = data.localId;
        // Optionally set displayName/claims via Admin
        try{
          const admin = initFirebaseAdmin();
          if (admin) {
            if (fn) await admin.auth().updateUser(localId, { displayName: fn.slice(0,120) });
            if (cn) await admin.auth().setCustomUserClaims(localId, { contactNumber: cn.slice(0,40) });
          }
        }catch(_){ }
      } else {
        // No email provided: create user via Admin SDK (stores email as null)
        const admin = initFirebaseAdmin();
        if (!admin) return res.status(500).json(stdFail('Firebase Admin not configured', 500));
        const created = await admin.auth().createUser({ password: pw, displayName: fn });
        localId = created.uid;
        try{ if (cn) await admin.auth().setCustomUserClaims(localId, { contactNumber: cn.slice(0,40) }); }catch(_){ }
      }

      await upsertRider({ uid: localId, email: em ? em : null, displayName: fn, contactNumber: cn, photoURL: null, password: pw });
      return res.status(200).json(stdOk({ registered: true }, 'Registered successfully', 200));
    }catch(e){ return res.status(500).json(stdFail('Registration failed', 500)); }
  },

  // Login with email/password via Firebase REST, then upsert/refresh Firestore rider and return idToken
  login: async (req, res) => {
    try{
      let { email, password, contactNumber = null } = req.body || {};
      if (!email && contactNumber) {
        const db = getFirestore();
        if (!db) return res.status(503).json(stdFail('Firestore unavailable', 503));
        const cn = String(contactNumber).trim();
        const q = await db.collection('riders').where('contactNumber','==', cn).limit(1).get();
        if (q.empty) return res.status(400).json(stdFail('No account found for that contact number', 400));
        const doc = q.docs[0];
        const d = doc.data() || {};
        if (!d.email) return res.status(400).json(stdFail('Account missing email', 400));
        email = d.email;
      }
      if (!email || !password) return res.status(400).json(stdFail('Missing email/password', 400));
      const key = getApiKey();
      if (!key) return res.status(500).json(stdFail('Firebase not configured', 500));
      const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
      const data = await resp.json().catch(()=>({}));
      if (!resp.ok || !data.idToken || !data.localId) {
        const msg = data && (data.error && data.error.message ? data.error.message : JSON.stringify(data));
        return res.status(400).json(stdFail(msg || 'Login failed', 400));
      }
      // Get user info to enrich Firestore
      let displayName = null; let photoURL = null;
      try{
        const admin = initFirebaseAdmin();
        if (admin) {
          const u = await admin.auth().getUser(data.localId);
          displayName = u.displayName || null; photoURL = u.photoURL || null;
        }
      }catch(_){ }
      const rider = await upsertRider({ uid: data.localId, email, displayName, contactNumber: (contactNumber !== undefined ? contactNumber : undefined), photoURL, password });
      return res.status(200).json(stdOk({ idToken: data.idToken, uid: data.localId, rider }, 'Logged in successfully', 200));
    }catch(e){ return res.status(500).json(fail('Login failed')); }
  },

  me: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const uid = decoded.uid;
      const db = getFirestore();
      if (!db) return res.status(503).json(stdFail('Firestore unavailable', 503));
      const doc = await db.collection('riders').doc(uid).get();
      if (!doc.exists) return res.status(200).json(stdOk({ rider: null }, 'OK', 200));
      return res.status(200).json(stdOk({ rider: { id: uid, ...doc.data() } }, 'OK', 200));
    }catch(e){
      return res.status(500).json(stdFail('Failed to load rider', 500));
    }
  },

  bindContact: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const { contactNumber } = req.body || {};
      const cn = contactNumber ? String(contactNumber).trim().slice(0, 40) : '';
      if (!cn) return res.status(400).json(stdFail('Missing contactNumber', 400));
      const db = getFirestore();
      if (!db) return res.status(503).json(stdFail('Firestore unavailable', 503));
      const uid = decoded.uid;
      await db.collection('riders').doc(uid).set({ contactNumber: cn, updatedAt: new Date().toISOString() }, { merge: true });
      try {
        const admin = initFirebaseAdmin();
        if (admin) await admin.auth().setCustomUserClaims(uid, { contactNumber: cn });
      } catch (_) {}
      const doc = await db.collection('riders').doc(uid).get();
      return res.status(200).json(stdOk({ rider: { id: uid, ...doc.data() } }, 'Contact number bound', 200));
    }catch(e){
      return res.status(500).json(stdFail('Failed to bind contact number', 500));
    }
  },

  updateProfile: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const { displayName, contactNumber } = req.body || {};
      if (displayName == null && contactNumber == null) return res.status(400).json(stdFail('No fields to update. Allowed fields: displayName, contactNumber', 400, { allowedFields: ['displayName','contactNumber'] }));
      const db = getFirestore();
      if (!db) return res.status(503).json(stdFail('Firestore unavailable', 503));
      const uid = decoded.uid;
      const patch = { updatedAt: new Date().toISOString() };
      if (displayName != null) patch.displayName = String(displayName).trim().slice(0,120) || null;
      if (contactNumber != null) patch.contactNumber = String(contactNumber).trim().slice(0,40) || null;
      await db.collection('riders').doc(uid).set(patch, { merge: true });
      try{
        const admin = initFirebaseAdmin();
        if (admin) {
          if (displayName != null) await admin.auth().updateUser(uid, { displayName: patch.displayName || undefined });
          if (contactNumber != null) await admin.auth().setCustomUserClaims(uid, { contactNumber: patch.contactNumber || undefined });
        }
      }catch(_){ }
      const doc = await db.collection('riders').doc(uid).get();
      return res.status(200).json(stdOk({ rider: { id: uid, ...doc.data() } }, 'Profile updated', 200));
    }catch(e){ return res.status(500).json(stdFail('Failed to update profile', 500)); }
  },

  listOrders: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const uid = decoded.uid;
      const { status = 'all', q = '', page = '1', limit = '20' } = req.query || {};
      let cached = await orderModel.getAll();
      const assigns = await orderModel.listAssignments();
      const aMap = new Map(assigns.map(a => [String(a.orderId), a]));

      function statusOf(o){
        const current = normalizeStatus(o?.current_status);
        if (current === 'assigned' || current === 'delivered' || current === 'in_progress') return current;
        const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
        const tagStr = tags.join(',').toLowerCase();
        if(tagStr.includes('assigned')) return 'assigned';
        if(o.fulfillment_status === 'fulfilled') return 'delivered';
        if(o.fulfillment_status === 'partial') return 'in_progress';
        return current || 'new';
      }

      const items = cached.map(o => ({
        ...o,
        assignment: aMap.get(String(o.id) || String(o.name) || String(o.order_number)) || null,
      }));

      const evAll = await deliveryModel.listAll();
      const evMap = new Map(evAll.map(e => [String(e.orderId), Array.isArray(e.events)?e.events:[]]));
      function isMine(o){
        const a = o.assignment;
        if (a && String(a.riderId) === String(uid)) return true;
        const evs = evMap.get(String(o.id) || String(o.name) || String(o.order_number)) || [];
        return evs.some(e=> String(e.riderId||'') === String(uid));
      }

      const ql = String(q).toLowerCase().trim();
      const normalizedStatus = normalizeStatus(status) || 'all';
      const filtered = items.filter(o => {
        if (!isMine(o)) return false;
        if (normalizedStatus !== 'all' && statusOf(o) !== normalizedStatus) return false;
        if (ql){
          const name = String(o.name || o.order_number || o.id || '').toLowerCase();
          const customer = String(o.full_name || o.customer?.full_name || '').toLowerCase();
          const addr = [o.shipping_address?.address1||'', o.shipping_address?.city||'', o.shipping_address?.province||'', o.shipping_address?.country||''].join(' ').toLowerCase();
          const text = `${name} ${customer} ${addr}`;
          if(!text.includes(ql)) return false;
        }
        return true;
      });

      const { items: pageItems } = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));
      return res.status(200).json(stdOk({ orders: pageItems }, 'OK', 200));
    }catch(e){ return res.status(500).json(stdFail('Failed to load orders', 500)); }
  },

  getOrder: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const uid = decoded.uid;
      const id = String(req.params.id);
      const o = await orderModel.getById(id);
      if (!o) return res.status(404).json(stdFail('Order not found', 404));
      const assigns = await orderModel.listAssignments();
      const a = assigns.find(x => String(x.orderId) === id) || null;
      const evs = await deliveryModel.getEvents(id);
      const mine = (a && String(a.riderId) === String(uid)) || (Array.isArray(evs) && evs.some(e => String(e.riderId||'') === String(uid)));
      if (!mine) return res.status(403).json(stdFail('Forbidden', 403));
      return res.status(200).json(stdOk({ order: { ...o, assignment: a || null, events: evs || [] } }, 'OK', 200));
    }catch(e){ return res.status(500).json(stdFail('Failed to load order', 500)); }
  },

  addOrderEvent: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(stdFail('Unauthorized', 401));
      const uid = decoded.uid;
      const id = String(req.params.id);
      const { type, expectedMinutes = null, notes = null } = req.body || {};
      if (!type) return res.status(400).json(stdFail('Missing type', 400));
      const o = await orderModel.getById(id);
      if (!o) return res.status(404).json(stdFail('Order not found', 404));
      const ev = await deliveryModel.addEvent(id, { type, expectedMinutes, notes, riderId: uid });
      if (!ev) return res.status(400).json(stdFail('Invalid event', 400));
      return res.status(200).json(stdOk({ event: ev }, 'Event recorded', 200));
    }catch(e){ return res.status(500).json(stdFail('Failed to add event', 500)); }
  },
};
