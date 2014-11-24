/* global AmCharts */
(function(){
  'use strict';

  angular.module('troll')
  .controller('ProCtrl', ['$scope', 'User', '$http', function($scope, User, $http){

    $scope.toggleStuff = function(){
      $scope.hideStuff = !!!$scope.hideStuff;
    };

    $scope.photo = {};

    $scope.takePhoto = function(){
      takepicture();
      $scope.photo = photo.currentSrc;
    };

    $scope.savePic = function(){
      //console.log('scope.photo', JSON.stringify($scope.photo);
      User.update($scope.photo).then(function(response){
        $scope.photo = response.data.profilePic;
        console.log('response', response);
        console.log('$scopeusserphoto', $scope.userPhoto);
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

    $scope.displayChart = function(){
        console.log('it worked');
      var chartData =
      [
    {
        'url': 'http://www.aboutmcdonalds.com/mcd.html',
        'images': 12
    },
    {
        'url': 'http://www.mcdonalds.com',
        'images': 8
    },
    {
        'url': 'http://www.aboutmcdonalds.com',
        'images': 12
    },
    {
        'url': 'http://www.facebook.com/mcdonaldscorp',
        'images': 1
    },
    {
        'url': 'http://instagram.com/mcdonalds?ref=badge',
        'images': 0
    },
    {
        'url': 'http://news.mcdonalds.com/Corporate/news-stories/McDonald-s-and-RMHC-Celebrate-40-Years-of-Supporti',
        'images': 9
    },
    {
        'url': 'http://news.mcdonalds.com/Corporate/news-stories/McDonald-s-To-Enter-New-Market-of-Kazakhstan-In-20',
        'images': 9
    },
    {
        'url': 'http://news.mcdonalds.com/Corporate/Media-Statements/Toy-Recall',
        'images': 9
    },
    {
        'url': 'http://news.mcdonalds.com/Corporate/news-stories/McDonald%E2%80%99s-Announces-New-Collaboration-with-Apple',
        'images': 10
    },
    {
        'url': 'http://news.mcdonalds.ca',
        'images': 3
    },
    {
        'url': 'http://news.mcdonalds.com',
        'images': 8
    },
    {
        'url': 'http://www.youtube.com/user/mcdonaldscorp',
        'images': 3
    },
    {
        'url': 'http://news.mcdonalds.com/Corporate/Home',
        'images': 8
    },
    {
        'url': 'http://community.aboutmcdonalds.com/t5/Let-s-Talk/The-Birth-of-the-Egg-McMuffin/ba-p/1412',
        'images': 20
    },
    {
        'url': 'http://www.youtube.com/mcdonaldscorp',
        'images': 3
    },
    {
        'url': 'http://pinterest.com/mcdonalds',
        'images': 115
    },
    {
        'url': 'http://www.flickr.com/photos/aboutmcdonalds',
        'images': 5
    },
    {
        'url': 'http://pinterest.com/mcdonalds',
        'images': 115
    },
    {
        'url': 'http://www.linkedin.com/company/mcdonalds-corporation',
        'images': 28
    },
    {
        'url': 'http://www.addthis.com/bookmark.php',
        'images': 0
    },
    {
        'url': 'http://www.cpsc.gov',
        'images': 31
    },
    {
        'url': 'http://www.entrepreneur.com/article/234898',
        'images': 7
    },
    {
        'url': 'http://news.mcdonalds.se',
        'images': 3
    },
    {
        'url': 'http://www.cpsc.gov/en/Recalls/2015/McDonalds-Recalls-Hello-Kitty-Themed-Whistles',
        'images': 4
    },
    {
        'url': 'http://www.linkedin.com/company/mcdonalds-corporation?trk=hb_tab_compy_id_2677',
        'images': 28
    },
    {
        'url': 'http://www.mcdonalds.com/newsroom',
        'images': 7
    },
    {
        'url': 'http://www.thedailymeal.com/worlds-top-10-coolest-mcdonalds-slideshow',
        'images': 18
    },
    {
        'url': 'http://www.aboutmcdonalds.com/rss/mcd/rss_amazing_stories.xml',
        'images': 0
    },
    {
        'url': 'http://www.aboutmcdonalds.com/mcd/terms_conditions.html',
        'images': 8
    },
    {
        'url': 'http://www.aboutmcdonalds.com/mcd/privacy_policy.html',
        'images': 8
    },
    {
        'url': 'http://www.aboutmcdonalds.com/country/map.html',
        'images': 8
    }
],

        chart = new AmCharts.AmSerialChart();
        console.log(chart);
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
