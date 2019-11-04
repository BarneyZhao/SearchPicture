const router = require('express').Router();

const baseService = require('../services/baseService');

router.get('/api/image', (req, res) => {
  const chars = [{
    reg: /\<0\>/g,
    str: '#',
  }, {
    reg: /\<1\>/g,
    str: '%',
  }, {
    reg: /\<2\>/g,
    str: '&',
  }, {
    reg: /\<3\>/g,
    str: '+',
  }];
  const file = chars.reduce((f, c) => f.replace(c.reg, c.str), req.query.f);
  baseService.getImage(file).then((data) => {
    if (!data) {
      res.status(404).end();
    } else {
      res.end(data);
    }
  }).catch((err) => {
    console.log(err);
    res.status(404).json({
      f: req.query.f,
      file,
      err,
    });
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
  const { id, flag } = req.body;
  baseService.likeOrDislike(id, flag).then((data) => {
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
  baseService.getFolderPics(req.body.id).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/folder/keyword', (req, res) => {
  const { id, keyword } = req.body;
  baseService.setFolderKeyword(id, keyword).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

router.post('/api/folder/mark', (req, res) => {
  const { id, flag } = req.body;
  baseService.markFolder(id, flag).then((data) => {
    res.json(data);
  }).catch((err) => {
    console.log(err);
    res.json(err.message || err);
  });
});

module.exports = router;
