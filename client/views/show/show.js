(function(){
  'use strict';

  angular.module('troll')
  .controller('ShowCtrl', ['$scope', function($scope){
    $scope.name = 'Bob Boberson';
    $scope.hideStuff = true;

    $scope.toggleStuff = function(){
      $scope.hideStuff = !!!$scope.hideStuff;
      $('.stuffContent').addClass('animated zoomIn');
    };


  }]);
})();
