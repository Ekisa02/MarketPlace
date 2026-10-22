const axios = require('axios');
const express = require('express');

function buildProxy(prefix) {
  const router = express.Router();

  router.use(async (req, res) => {
    const url = `${process.env.FASTAPI_URL}${prefix}${req.path}`;
    try {
      const response = await axios({
        method: req.method,
        url,
        params: req.query,
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
          'X-User-UID': req.user.uid,
          'X-User-Role': req.user.role || ''
        },
        validateStatus: () => true
      });
      res.status(response.status).json(response.data);
    } catch (err) {
      res.status(502).json({ error: 'Upstream service unavailable', detail: err.message });
    }
  });

  return router;
}

module.exports = buildProxy;