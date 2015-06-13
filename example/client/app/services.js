/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('refactoryExample.services', [])
    .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['refactoryFactory'];

  function MessageFactory (refactoryFactory) {
    return refactoryFactory({ model: 'message' });
  }

})();
