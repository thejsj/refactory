/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('refactoryExample.services', [])
    .factory('messageFactory', messageFactory);

  messageFactory.$inject = ['refactoryFactory'];

  function messageFactory (refactoryFactory) {
    return refactoryFactory({ model: 'message' });
  }

})();
