(function(){
  'use strict';

  angular.module('troll')
  .controller('CrawlerCtrl', ['$scope', 'Crawler', function($scope, Crawler){
    $scope.search = {mainUrl: 'http://www.espn.com', depth: 1};
    $scope.results = {};
    $scope.isLoading = false;

    $scope.$on('doneLoading', function(){
      $scope.isLoading = false;
    });

    $scope.queueSearch = function(){
      $scope.isLoading = true;
      Crawler.search($scope.search).then(function(res){
        $scope.$emit('doneLoading');
        $scope.results = res.data;
      }, function(res){
        $scope.$emit('doneLoading');
      });
    };
  }]);
})();
