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
};
