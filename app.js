'use strict';
var express = require('express');
var app = express();
var path = require('path');
// var config = require(path.join(__dirname, '/config'));
var bodyParser = require('body-parser');
// app properties setting
app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

global.rootpath = __dirname;

// middleware
app.use(require('./server/middlewares/crossOrigin.js'));

// routes setting
app.use(require('./server/controllers/baseController.js'));

// server startup
const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port + '...');
});
