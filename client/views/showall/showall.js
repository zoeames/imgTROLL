(function(){
  'use strict';

  angular.module('troll')
  .controller('ShowCtrl', ['$scope', 'User', '$http', function($scope, User, $http){

    $scope.allUsers=[];

    User.getAll().then(function(response){

      $scope.allUsers = response.data.users;
    });
  }]);
})();
