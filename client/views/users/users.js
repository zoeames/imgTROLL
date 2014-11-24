(function(){
  'use strict';

  angular.module('troll')
    .controller('UsersCtrl', ['$scope', '$state', 'User', '$rootScope', function($scope, $state, User, $rootScope){
      $scope.user = {username: 'anon'};
      $scope.mode = $state.current.name;

      $scope.checkSession = function(){
        User.checkSession().then(function(res){
          $scope.user = res.data;
        }, function(res){
          $scope.user = {username: 'anon'};
        });
      };

      //Run this funtion on every single page refresh
      $scope.checkSession();

      //check to see if a state has changed and fill it with the user data from the back end
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        $scope.checkSession();
      });

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.checkSession();
      });

      $scope.logout = function(){
        User.logout().then(function(){
          $scope.user = {username: 'anon'};
          toastr.success('User successfully logged out.');
          $state.go('home');
        });
      };

    }]);
})();
