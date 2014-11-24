(function(){
  'use strict';

  angular.module('troll')
    .controller('RegCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
      $scope.userCreds = {};
      $scope.mode = $state.current.name;

      $scope.register = function(){
        User.register($scope.userCreds).then(function(response){
          toastr.success('User successfully registered.');
          $state.go('login');
        }, function(){
          toastr.error('Error during registration.');
        });
      };

    }]);
})();
