const router = require('express').Router();

const baseService = require('../services/baseService');

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

router.get('/api/search', (req, res) => {
  let promise = null;
  console.log('');
  console.log('/api/search');
  console.log(`---conditions---:${new Date()}`);
  console.log(req.query);
  if (req.query.searchFolderType === 'db') promise = baseService.searchDb(req.query);
  else promise = baseService.search(req.query);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.get('/api/search/sql', (req, res) => {
  console.log('');
  console.log('/api/search/sql');
  console.log(`---conditions---:${new Date()}`);
  console.log(req.query);
  baseService.searchDbByInputSql(req.query.sql).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.get('/api/search/random', (req, res) => {
  console.log('');
  console.log('/api/search/random');
  console.log(`---conditions---:${new Date()}`);
  console.log(req.query);
  const limit = parseInt(req.query.limit, 10);
  baseService.searchDbByRandom(limit).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});
module.exports = router;
