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
      addMessage: function (text) {
        console.log('Add Message');
        //socket.emit('message', {
          //text: text,
          //email: window.config.email
        //});
      },
      getMessageCollection: function () {
        console.log('$http getMessageColelction');
        return $http.get('/refactory/messages')
          .then(function (res) {
            console.log('res');
            console.log(res);
            messageCollection = res;
            return messageCollection;
          })
          .catch(function (err) {
            console.log('Error', err);
          });
      }
    };
    return factory;
  }

})();
