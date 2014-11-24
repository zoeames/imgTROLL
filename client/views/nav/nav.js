(function(){
  'use strict';

  angular.module('troll')
    .controller('NavCtrl', ['$scope', '$state', 'User', '$localForage', function($scope, $state, User, $localForage){

      /*
      $localForage.getItem('username').then(function(username){
        $scope.username = username;
      });

      $scope.$on('authenticated', function(event, username){
        if(username === 'anonymous'){username=null;}

        $localForage.setItem('username', username).then(function(){
          $scope.username = username;
        });
      });
      */

    }]);
})();
