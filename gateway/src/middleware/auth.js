const admin = require('../config/firebase');
const { getFirestore } = require('firebase-admin/firestore');

async function verifyFirebaseToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(header.split('Bearer ')[1]);
    req.user = { uid: decoded.uid, email: decoded.email };

    // Load role from Firestore
    const snap = await getFirestore().collection('users').doc(decoded.uid).get();
    req.user.role = snap.exists ? snap.data().role : null;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

module.exports = { verifyFirebaseToken, requireAdmin };