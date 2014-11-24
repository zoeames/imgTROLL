/* global AmCharts */
(function(){
  'use strict';

  angular.module('troll')
  .controller('ProCtrl', ['$scope', 'User', '$http', 'Search', function($scope, User, $http, Search){
    $scope.searchHistory = [];
    $scope.currentImageSet = [
    'assets/img/greenBlurry.jpg',
    'assets/img/imgTROLL.png'
    ];

    $scope.viewImages = function(images){
      $scope.currentImageSet = images;
    };

    Search.history().then(function(res){
        $scope.searchHistory = res.data;
    });

    $scope.toggleStuff = function(){
      $scope.hideStuff = !!!$scope.hideStuff;
    };

    $scope.photo = {};

    $scope.takePhoto = function(){
      takepicture();
      $scope.photo = photo.currentSrc;
    };

    $scope.savePic = function(){
      User.update($scope.photo).then(function(response){
        $scope.photo = response.data.profilePic;
      });
    };

    var streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
    width = 320,
    height = 0;

    navigator.getMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream){
        if (navigator.mozGetUserMedia){
          video.mozSrcObject = stream;
        }else{
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err){
        console.log('An error occured! ' + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if(!streaming){
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    function takepicture(){
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

    $scope.displayChart = function(data){
        var chartData = data,
        chart = new AmCharts.AmSerialChart();
            chart.dataProvider = chartData;
            chart.categoryField = 'url';
            chart.valueField = 'images';
            chart.angle = 30;
            chart.depth3D = 8;

        var graph = new AmCharts.AmGraph();
            graph.valueField = 'images';
            graph.type = 'column';
            chart.addGraph(graph);
            graph.fillColors = '#bf1c25';
            graph.lineAlpha = 0;
            graph.fillAlphas = 0.7;
            graph.balloonText = '[[category]]: <b>[[value]]</b>';

        var categoryAxis = chart.categoryAxis;
            categoryAxis.autoGridCount  = false;
            categoryAxis.gridCount = chartData.length;
            categoryAxis.gridPosition = 'start';
            categoryAxis.axisColor = '#DADADA';
            categoryAxis.fillColor = '#FAFAFA';
            categoryAxis.labelRotation = 90;

        chart.write('chartdiv');
    };
  }]);
})();
