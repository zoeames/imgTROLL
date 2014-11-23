(function(){
  'use strict';

  angular.module('troll')
  .controller('ShowCtrl', ['$scope', 'User', '$http', function($scope, User, $http){
    $scope.aUser = {};

    aUser.getAll().then(function(response){
    debugger;
      $scope.aUser = response;
    });
  }]);
})();
