var express = require('express');
var r = require('rethinkdb');
var socketio = require("socket.io");
require('rethinkdb-init')(r);
var http = require('http');

var routeGenerator = require('./route-generator');

var refactory = function refactory (opts) {

  var httpServer = http.Server(opts.app);
  console.log('Starting Socket.io server');
  var io = socketio(httpServer);

  var config =  { db: 'refactory' };
  var models = opts.models;
  var socketPort = opts.socketPort;
  var router = express.Router();
  // For every model, make sure a table is created
  r.ready = r.init(config, models.map(function (model) {
    return {
      name: model
    };
  }))
  .then(function (conn) {
    r.conn = conn;
    // Generate all routes
    console.log('Creating routes');
    models.forEach(routeGenerator.bind(null, router, r, config));
    // Start listening on all tables
  });

  router.use('/client.js', function () {
    // Return Socket.io client and angular client

  });

  return router;
};

module.exports = refactory;
