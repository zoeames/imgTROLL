(function(){
  'use strict';

  angular.module('troll')
  .controller('ProCtrl', ['$scope', 'User', '$http', function($scope, User, $http){
    // User.show().then(function(response){
    //   console.log('RESPONSE .....', response);
    //   //$scope.username = response.data.username;
    // });
    // $scope.username = $http.get('/profile');
    var user = User.user;
    $scope.username=user.username;
    console.log('User.user . . . . ', User.user);
    console.log($scope.username);

  }]);
})();
