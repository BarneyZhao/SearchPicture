const router = require('express').Router();

const baseService = require('../services/baseService.js');

router.get('/api/image', (req, res) => {
  baseService.getImage(req.query.f).then((data) => {
    if (!data) {
      res.status(404).end();
    } else {
      res.end(data);
    }
  }).catch(() => {
    res.status(404).end();
  });
});

module.exports = router;
