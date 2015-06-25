/*global angular:true */
(function () {
  'use strict';

  var email = prompt('What\'s your email?');

  angular.module('refactoryExample.messages', ['ui.router'])
    .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$scope', '$window', 'messageFactory'];

  function MessagesController($scope, $window, messageFactory) {

    var vm = this;
    vm.messages = messageFactory();
    vm.submit = submit;
    vm.email = email;

    function submit() {
      if (vm.text.length > 0) {
        messageFactory.insert({
          text: vm.text,
          email: vm.email,
          time: (new Date()).getTime()
        });
        vm.text = '';
      }
    }

  }
})();
