const { initFirebaseAdmin } = require('../services/firebaseAdmin');
const { getFirestore } = require('../services/firestore');
const { ok, fail } = require('../utils/response');

async function verifyBearer(req){
  const h = req.headers && req.headers.authorization;
  if (!h || !/^bearer\s+/i.test(h)) return null;
  const token = h.split(/\s+/)[1];
  const admin = initFirebaseAdmin();
  if (!admin) return null;
  try { return await admin.auth().verifyIdToken(token); } catch { return null; }
}

module.exports = {
  me: async (req, res) => {
    try{
      const decoded = await verifyBearer(req);
      if (!decoded) return res.status(401).json(fail('Unauthorized'));
      const uid = decoded.uid;
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore unavailable'));
      const doc = await db.collection('riders').doc(uid).get();
      if (!doc.exists) return res.json(ok({ rider: null }));
      return res.json(ok({ rider: { id: uid, ...doc.data() } }));
    }catch(e){
      return res.status(500).json(fail('Failed to load rider'));
    }
  },
};
