const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { getFirestore } = require('../services/firestore');
const { ok, fail, stdOk, stdFail } = require('../utils/response');
const { getClientConfig } = require('./firebaseAuthController');

async function verifyBearer(req){
  const h = req.headers && req.headers.authorization;
  if (!h || !/^bearer\s+/i.test(h)) return null;
  const token = h.split(/\s+/)[1];
  const admin = initFirebaseAdmin();
  if (!admin) return null;
  try { return await admin.auth().verifyIdToken(token); } catch { return null; }
}

function getApiKey(){
  const cfg = getClientConfig();
  return (cfg && cfg.apiKey) || process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '';
}

async function upsertRider({ uid, email, displayName, contactNumber, photoURL }){
  const db = getFirestore();
  if (!db) return null;
  const now = new Date().toISOString();
  const docRef = db.collection('riders').doc(uid);
  const snap = await docRef.get();
  const payload = { uid, updatedAt: now };
  if (!snap.exists) payload.createdAt = now;
  if (email !== undefined) payload.email = email;
  if (displayName !== undefined) payload.displayName = displayName;
  if (contactNumber !== undefined) payload.contactNumber = contactNumber;
  if (photoURL !== undefined) payload.photoURL = photoURL;
  await docRef.set(payload, { merge: true });
  const doc = await docRef.get();
  return { id: uid, ...doc.data() };
}

module.exports = {
  // Register with email/password via Firebase REST, then upsert Firestore rider and return idToken
  register: async (req, res) => {
    try{
      const { email, password, fullName = null, contactNumber = null } = req.body || {};
      if (!email || !password) return res.status(400).json(stdFail('Missing email/password', 400));
      const key = getApiKey();
      if (!key) return res.status(500).json(stdFail('Firebase not configured', 500));
      const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName: fullName || undefined, returnSecureToken: true })
      });
      const data = await resp.json().catch(()=>({}));
      if (!resp.ok || !data.idToken || !data.localId) {
        const msg = data && (data.error && data.error.message ? data.error.message : JSON.stringify(data));
        return res.status(400).json(stdFail(msg || 'Registration failed', 400));
      }
      // Optionally set displayName/claims via Admin
      try{
        const admin = initFirebaseAdmin();
        if (admin) {
          if (fullName) await admin.auth().updateUser(data.localId, { displayName: String(fullName).trim().slice(0,120) });
          if (contactNumber) await admin.auth().setCustomUserClaims(data.localId, { contactNumber: String(contactNumber).trim().slice(0,40) });
        }
      }catch(_){}
      await upsertRider({ uid: data.localId, email, displayName: fullName, contactNumber, photoURL: null });
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
      const rider = await upsertRider({ uid: data.localId, email, displayName, contactNumber: (contactNumber !== undefined ? contactNumber : undefined), photoURL });
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
      if (!cn) return res.status(400).json(fail('Missing contactNumber'));
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
      return res.status(500).json(fail('Failed to bind contact number'));
    }
  },
};
