var express = require('express');
var app = express();
var config = require('config');
var refactory = require('../../server/refactory.js');
var clientConfigParser = require('./clientConfigParser');

app
  .use('/config.js', clientConfigParser)
  .use('/refactory', refactory({
    models: ['message'],
    app: app,
  }))
  .use(express.static(__dirname + '/../client'))
  .listen(3000);
