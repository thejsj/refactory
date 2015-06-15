var express = require('express');
var r = require('rethinkdb');
var socketio = require("socket.io");
require('rethinkdb-init')(r);
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var routeGenerator = require('./route-generator');

var refactory = function refactory (opts) {

  var io = socketio(opts.httpServer);

  var config =  {};
  config.db = opts.db_name || 'refactory';
  config.host = opts.db_host || 'localhost';
  config.port = opts.db_port || 28015;

  var models = opts.models;
  var router = express.Router();

  router
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(bodyParser.json());

  // For every model, make sure a table is created
  r.ready = r.init(config, models.map(function (model) {
    return {
      name: model
    };
  }))
  .then(function (conn) {
    r.conn = conn;
    // Generate all routes
    models.forEach(routeGenerator.bind(null, router, r, config));
    // Start listening on all tables
    models.forEach(function (model) {
      // Separate connection for every model
      r.connect(config)
       .then(function (conn){
        return r.table(model).changes().run(conn)
         .then(function (cursor) {
           cursor.each(function (err, row) {
             io.emit(model, row);
           });
         });
       });
    });

  });

  router.use('/client.js', function (req, res) {
    // Return Socket.io client and angular client
    var p = path.dirname(__dirname) + '/client/dist/client.js';
    res.sendFile(p);
  });

  return router;
};

module.exports = refactory;
