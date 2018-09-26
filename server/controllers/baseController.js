const router = require('express').Router();

const baseService = require('../services/baseService.js');
// var config = require(global.__base + '/config');

router.get('/api/search', (req, res) => {
  baseService.search(req.query).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.get('/api/image', (req, res) => {
  baseService.getImage(req.query).then((data) => {
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
