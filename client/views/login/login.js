(function(){
  'use strict';

  angular.module('troll')
    .controller('LoginCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
      $scope.userCreds = {};
      $scope.mode = $state.current.name;

      $scope.login = function(){
        User.login($scope.userCreds).then(function(response){
          $scope.user = response.data;
          toastr.success('Welcome ' + $scope.user.username);
          $state.go('home');
        }, function(){
          toastr.error('Error during authentication.');
        });
      };
    }]);
})();
