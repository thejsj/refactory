var express = require('express');
var app = express();
var http = require('http');
var config = require('config');
var refactory = require('../../server/refactory.js');
var clientConfigParser = require('./clientConfigParser');

var httpServer = http.createServer(app);
app
  .use('/config.js', clientConfigParser)
  .use('/refactory', refactory({
    models: ['message'],
    httpServer: httpServer
  }))
  .use(express.static(__dirname + '/../client'));

httpServer.listen(3000);
