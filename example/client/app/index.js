/*global angular:true */
(function () {
  'use strict';
  angular.module('refactoryExample', [
      'ui.router',
      'refactoryExample.services',
      'refactoryExample.messages'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('main', {
          templateUrl: '/app/main/main.html',
          url: '/'
        });
      });
})();
