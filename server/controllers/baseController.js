const router = require('express').Router();

const baseService = require('../services/baseService');

router.get('/api/image', (req, res) => {
  baseService.getImage(req.query.f).then((data) => {
    if (!data) {
      res.status(404).end();
    } else {
      res.end(data);
    }
  }).catch((err) => {
    console.log(err);
    res.status(404).end();
  });
});

router.post('/api/search', (req, res) => {
  let promise = null;
  if (req.body.searchFolderType === 'db') promise = baseService.searchDb(req.body);
  else promise = baseService.search(req.body);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/search/sql', (req, res) => {
  baseService.searchDbByInputSql(req.body.sql).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/search/random', (req, res) => {
  baseService.searchDbByRandom(req.body.limit).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/pic/likeOrDislike', (req, res) => {
  baseService.likeOrDislike(req.body).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/folder', (req, res) => {
  baseService.getFolder().then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/folder/pic', (req, res) => {
  baseService.getFolderPics(req.body).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/folder/keyword', (req, res) => {
  baseService.setFolderKeyword(req.body).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

module.exports = router;
