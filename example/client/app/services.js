/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('refactoryExample.services', [])
    .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['$http', '$rootScope'];

  function MessageFactory ($http, $rootScope) {

    //var socket = io.connect('http://' + window.config.url + ':' + window.config.ports.http);
    var messageCollection = [];

    //socket.on('message', function (message) {
      //$rootScope.$apply(function () {
        //messageCollection.push(message);
      //});
    //});

    var factory = {
      add: function (doc) {
        console.log('Add Message');
        console.log('doc', doc);
        return $http.post('/refactory/message', {
          'document': doc
        })
          .then(function (res) {
            console.log('add');
            console.log(res);
          })
          .catch(function (err) {
            console.log('Error', err);
          });
      },
      get: function () {
        console.log('$http getMessageColelction');
        return $http.get('/refactory/message')
          .then(function (res) {
            console.log(res.data);
            messageCollection = res.data;
            return messageCollection;
          })
          .catch(function (err) {
            console.log('Error', err);
          });
      }
      // TODO: Add Update
      // TODO: Add Delete
    };
    return factory;
  }

})();
