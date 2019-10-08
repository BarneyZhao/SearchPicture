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

module.exports = router;
