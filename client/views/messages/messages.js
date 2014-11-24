(function(){
  'use strict';

  angular.module('troll')
  .controller('MsgCtrl', ['$scope', 'Message', 'User', '$http', function($scope, Message, $http, User){
    $scope.title = 'Message Page';
    $scope.message = {};
    console.log('message', $scope.title);
    $scope.receivers = ['one', 'two', 'three'];
    $scope.messages = [];

    //User.getAll().then(function(response){
    //	debugger;
      //	$scope.receivers = response.data;
      //});

    $scope.submit = function(){
       Message.send($scope.message).then(function(response){
         //debugger;
       $scope.message = response.data;
      });
    };

    Message.showAll().then(function(response){
      //debugger;
      $scope.messages  = response.data;
    });

  }]);
})();
