const { initFirebaseAdmin } = require('./firebaseAdmin');

function getFirestore(){
  const admin = initFirebaseAdmin();
  if (!admin) return null;
  try { return admin.firestore(); } catch { return null; }
}

module.exports = { getFirestore };
