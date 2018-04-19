const router = require('express').Router();
const baseService = require('../services/baseService.js');
// var config = require(global.__base + '/config');

router.get('/search', (req, res) => {
  baseService.search(req.query).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message);
  });
});

module.exports = router;
