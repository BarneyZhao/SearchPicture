const router = require('express').Router();

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('');
    console.log(req.url);
    console.log(`---conditions---:${new Date()}`);
    console.log(req.body);
  }
  next();
});

module.exports = router;
