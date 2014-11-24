(function(){
  'use strict';

  angular.module('troll')
  .controller('MsgCtrl', ['$scope', 'Message', 'User', function($scope, Message, User){
    $scope.title = 'Message Page';
    $scope.message = {};
    console.log('message', $scope.title);
    $scope.receivers = [];
    $scope.messages = [];
    $scope.receiver = {};

    User.checkSession().then(function(response){
      //debugger;
      $scope.message.sender = response.data.username;
    });

    User.getAll().then(function(response){
      $scope.receivers = response.data.users;
    });

    $scope.submit = function(){
      Message.send($scope.message).then(function(response){
        $scope.message = response.data;
      });
    };

    Message.showAll().then(function(response){
      $scope.messages  = response.data;
    });

  }]);
})();
