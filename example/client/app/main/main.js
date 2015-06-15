/*global angular:true */
(function () {
  'use strict';

  angular.module('refactoryExample.messages', ['ui.router'])
    .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$scope', '$window', 'messageFactory'];

  function MessagesController($scope, $window, messageFactory) {
    var vm = this;
    vm.messages = messageFactory();
    vm.submit = submit;

    function submit() {
      if (vm.text.length > 0) {
        messageFactory.insert({
          text: vm.text,
          email: 'jorge.silva.jetter@gmail.com',
          time: (new Date()).getTime()
        });
        vm.text = '';
      }
    }

  }
})();
