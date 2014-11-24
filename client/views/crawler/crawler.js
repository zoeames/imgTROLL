(function(){
  'use strict';

  angular.module('troll')
  .controller('CrawlerCtrl', ['$scope', 'Crawler', function($scope, Crawler){
    $scope.search = {mainUrl: 'http://www.mcdonalds.com', depth: 1};
    $scope.results = {};
    $scope.isLoading = false;
    $scope.hasLoaded = false;

    $scope.$on('doneLoading', function(){
      $scope.isLoading = false;
      $scope.startTimer();
    });

    $scope.startTimer = function(){
      var timer = setInterval(function(){
        $scope.hasLoaded = false;
        clearInterval(timer);
      }, 3000);
    };


    $scope.queueSearch = function(){
      $scope.isLoading = true;
      Crawler.search($scope.search).then(function(res){
        $scope.$emit('doneLoading');
        $scope.hasLoaded = true;
        $scope.results = res.data;
      }, function(res){
        $scope.$emit('doneLoading');
      });
    };
  }]);
})();
