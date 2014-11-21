(function(){
  'use strict';

  angular.module('troll')
  .controller('ProCtrl', ['$scope', 'User', '$http', function($scope, User, $http){
    var user = User.user;
    $scope.username=user.username;
    console.log('User.user . . . . ', User.user);
    console.log($scope.username);

  }]);
})();
