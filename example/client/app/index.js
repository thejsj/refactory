/*global angular:true */
(function () {
  'use strict';

  var app = angular.module('refactoryExample', [
      'ui.router',
      'refactory',
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
