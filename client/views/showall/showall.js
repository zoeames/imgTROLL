(function(){
  'use strict';

  angular.module('troll')
  .controller('ShowCtrl', ['$scope', 'User', '$http', function($scope, User, $http){

    $scope.allUsers=[];

    User.getAll().then(function(response){
      console.log('response', response);
      console.log('$scopeusserphoto', $scope.userPhoto);
      $scope.allUsers = response.data.users;
    });
  }]);
})();
