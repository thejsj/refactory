(function () {

  var io = require('socket.io-client');
  var mod = angular.module('refactory', [])
    .provider('refactoryFactory', function () {
      var refactoryFactory = function ($rootScope, $http) {
        /*
         * Options:
         * `model`: Name of model in the data
         * `url`: Url to which Socket.io will be connecting to
         * `refactoryPath`: Path at which Refactory is running an receeiving HTTP requests
         */
        return function (opts)  {

         // Option Defaults
         var url = opts.url || 'http://localhost:3000';
         var modelName = opts.model;
         var refactoryPath = opts.refactoryPath || 'refactory';
         var httpUrl = url + '/' + refactoryPath + '/' + modelName;

          var socket = io.connect(url);
          var collection = [];
          var collectionIds = { };

          socket.on(modelName, function (data) {
            $rootScope.$apply(function () {
              if (data.old_val === null) {
                // Document is getting inserted
                var newIndex = collection.push(data.new_val);
                collectionIds[data.new_val] = newIndex;
              } else if (data.new_val === null){
                // Documented is getting deleted
                var delete_index = collectionIds[data.new_val];
                var oldVal = collection.splice(delete_index, 1)[0];
                // Update Indexes
                for (var key in collectionIds) {
                  if (collectionIds[key] > key) {
                    collectionIds[key] -= 1;
                  }
                }
              } else if (data.new_val.id === data.old_val.id) {
                // Document is getting updated
                var update_index = collectionIds[data.new_val.id];
                collection[update_index] = data.new_val;
              }
            });
          });

          var factory = {
            add: function (doc) {
              return $http.post(httpUrl, {
                'document': doc
              });
            },
            get: function () {
              return $http.get(httpUrl)
                .then(function (res) {
                  collection = res.data;
                  // Map ids to their indexes
                  collection.forEach(function (row, i) {
                    collectionIds[row.id] = i;
                  });
                  return collection;
                });
            },
            update: function (doc) {
              return $http.put(httpUrl, {
                'id': doc.id,
                'document': doc
              });
            },
            delete: function (doc) {
              return $http.delete(httpUrl, {
                'id': doc.id
              });
            }
          };
          return factory;
        };
      };

      this.$get = ['$rootScope', '$http', refactoryFactory];
    });

}());
