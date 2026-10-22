const express = require('express');
const buildProxy = require('./proxy');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAdmin, buildProxy('/admin'));
module.exports = router;