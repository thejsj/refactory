module.exports = function (router, r, config, model) {
  var path = '/' + model;

  // Add 'GET' route
  router.get(path, function (req, res, next) {
    return r.db(config.db).table(model)
     .coerceTo('array')
     .run(r.conn)
     .then(function (data) {
       res.json(data);
     });
  });

  // Add 'POST' route
  router.post(path, function (req, res, next) {
    return r.db(config.db).table(model)
     .insert(req.body.document, { return_changes: true})
     .run(r.conn)
     .then(function (data) {
       res.json(data);
     });
  });

  // Add 'PUT' route
  router.put(path, function (req, res, next) {
    return r.db(config.db).table(model)
      .get(req.body.id)
     .update(req.body.document, { return_changes: true})
     .run(r.conn)
     .then(function (data) {
       res.json(data);
     });
  });

  // Add 'DELETE' route
  router.delete(path, function (req, res, next) {
    return r.db(config.db).table(model)
     .get(req.body.id)
     .delete()
     .run(r.conn)
     .then(function (data) {
       res.json(data);
     });
  });
};
