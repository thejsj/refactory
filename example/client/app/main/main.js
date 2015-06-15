/*global angular:true */
(function () {
  'use strict';

  angular.module('refactoryExample.messages', ['ui.router'])
    .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$scope', '$window', 'MessageFactory'];

  function MessagesController($scope, $window, MessageFactory) {
    var vm = this;
    vm.messages = MessageFactory();
    vm.submit = submit;

    function submit() {
      if (vm.text.length > 0) {
        MessageFactory.insert({
          text: vm.text,
          email: 'jorge.silva.jetter@gmail.com',
          time: (new Date()).getTime()
        });
        vm.text = '';
      }
    }

  }
})();
