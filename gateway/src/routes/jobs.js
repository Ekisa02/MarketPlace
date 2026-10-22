const express = require('express');
const buildProxy = require('./proxy');
const router = express.Router();
router.use('/', buildProxy('/jobs'));
module.exports = router;