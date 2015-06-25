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
         var host = opts.host || null;
         var port = opts.port || null;
         // This logic could probably be improved
         var url;
         if (host && !port) {
           url = host;
         } else if (host && port){
           url = host + ':' + port;
         } else {
           url = '';
         }
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
                var newIndex = collection.push(data.new_val) - 1;
                collectionIds[data.new_val.id] = newIndex;
              } else if (data.new_val === null){
                // Documented is getting deleted
                var delete_index = collectionIds[data.old_val.id];
                var oldVal = collection.splice(delete_index, 1);
                // Update Indexes
                for (var key in collectionIds) {
                  if (collectionIds[key] === delete_index) {
                    delete collectionIds[key];
                  } else if (collectionIds[key] > delete_index) {
                    collectionIds[key] -= 1;
                  }
                }
              } else if (data.new_val.id === data.old_val.id) {
                // Document is getting updated
                var update_index = collectionIds[data.old_val.id];
                collection[update_index] = data.new_val;
              }
            });
          });

          var factory = function () {
            return collection;
          };

          factory.insert = function (doc) {
            return $http.post(httpUrl, {
              'document': doc
            });
          };

          factory.get = function () {
            return $http.get(httpUrl)
              .then(function (res) {
                // We don't want to break the reference to this array in other
                // parts of our code. Hence we need to remove all elements and
                // add them to the array one by one
                collection.splice(0, collection.length);
                res.data.forEach(function (row) {
                  collection.push(row);
                });
                // Map ids to their indexes
                collection.forEach(function (row, i) {
                  collectionIds[row.id] = i;
                });
                return collection;
              });
          };

          factory.update = function (doc) {
            return $http.put(httpUrl, {
              'id': doc.id,
              'document': doc
            });
          };

          factory.delete = function (doc) {
            return $http.delete(httpUrl, {
              'id': doc.id
            });
          };

          // Get the initial state of messages
          factory.get();
          return factory;
        };
      };

      this.$get = ['$rootScope', '$http', refactoryFactory];
    });

}());
