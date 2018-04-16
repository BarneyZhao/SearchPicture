const router = require('express').Router();
// var analyticsService = require(global.__base + '/server/services/analyticsService.js');
// var config = require(global.__base + '/config');

router.get('/search', (req, res) => {
  res.json(req.headers);

  // analyticsService.webTracking(TrackingData, config.api.trackingApiUrl)
  //   .then(function (data) {
  //     res.json(data);
  //   })
  //   .catch(function (err) {
  //     log.error((err && err.stack) || JSON.stringify(err));
  //     res.json(err);
  //   });
});

module.exports = router;
