(function () {

  angular.module('refactory', [])
    .provider('refactory', function () {

      var refactoryFactory = function ($rootScope, $q) {
        return function (options)  {
          console.log('Hello World');
          return {
            'get': function () {
              return Math.random();
            }
          };
        };
      };

      this.$get = ['$rootScope', '$q', refactoryFactory];
    });
}());
