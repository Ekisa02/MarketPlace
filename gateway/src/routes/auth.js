const express = require('express');
const { getAuth } = require('firebase-admin/auth');
const buildProxy = require('./proxy');

const router = express.Router();

// Convenience: return the current Firebase user's identity.
router.get('/me', (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email, role: req.user.role });
});

// Proxy anything else to FastAPI /auth/*
router.use('/', buildProxy('/auth'));

module.exports = router;