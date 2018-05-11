/* eslint-disable no-console,import/no-dynamic-require */
const router = require('express').Router();

const baseService = require(`${global.rootpath}/server/services/baseService.js`);
// var config = require(global.__base + '/config');

router.get('/search', (req, res) => {
  baseService.search(req.query).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.get('/image', (req, res) => {
  baseService.getImage(req.query).then((data) => {
    if (!data) {
      res.statusCode(404);
      res.end();
    } else {
      res.end(data);
    }
  }).catch(() => {
    res.statusCode(404);
    res.end();
  });
});

module.exports = router;
