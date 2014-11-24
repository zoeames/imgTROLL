(function(){
  'use strict';

  angular.module('troll')
  .controller('MsgCtrl', ['$scope', 'Message', 'User', function($scope, Message, User){
  	$scope.title = 'Message Page';
  	$scope.message = {};
  	console.log('message', $scope.title);
  	$scope.receivers = [];
  	$scope.messages = [];

  	User.getAll().then(function(response){
      debugger;
  		$scope.receivers = response.data.users;
  	});

  	$scope.submit = function(){
  		Message.send($scope.message).then(function(response){
        debugger;
  			$scope.message = response.data;
  		});
  	};

  	Message.showAll().then(function(response){
  		$scope.messages  = response.data;
  	});

  }]);
})();
