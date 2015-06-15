#! /usr/bin/env node
var cli = require('cli').enable('status');
var refactory = require('../server/refactory');
var express = require('express');
var http = require('http');
var refactory = require('../server/refactory.js');
var assign = require('lodash/object/assign');
var taser = require('taser');

cli.parse({
  models:     [false, 'Comma separated lists of models you wish to make available', 'string', ''],

  port:       [false, 'Port number in which refactory should listen for traffic', 'number', 3000],
  public_dir: [false, 'Directory from which to server static assets', 'string', ''],
  route:      [false, 'Route from which to server will server refactory http routes', 'string', 'refactory'],

  db_host:    [false, 'Host for RethinkDB', 'string', 'localhost'],
  db_port:    [false, 'Port for RethinkDB', 'number', 28015],
  db_name:    [false, 'Database for refactory database in RethinkDB', 'string', 'refactory'],
});

cli.main(function (args, opts) {
  // Assert types
  taser(opts.models, 'string');
  taser(opts.port, 'number');
  taser(opts.public_dir, 'string');
  taser(opts.route, 'string');
  taser(opts.db_host, 'string');
  taser(opts.db_port, 'number');
  taser(opts.db_name, 'string');

  opts.models = opts.models.split(',');
  taser(opts.models, 'array');

  var app = express();
  var httpServer = http.createServer(app);

  app
    .use('/' + opts.route, refactory(assign(opts, {
      httpServer: httpServer
    })))
    .use(express.static(process.env.PWD + '/' + opts.public_dir));

  httpServer.listen(opts.port);
});
