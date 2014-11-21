(function(){
  'use strict';

  angular.module('troll')
  .controller('ProCtrl', ['$scope', 'User', '$http', function($scope, User, $http){
    var user = User.user;
    $scope.username=user.username;
    console.log('User.user . . . . ', User.user);
    console.log($scope.username);

    $scope.toggleStuff = function(){
      $scope.hideStuff = !!!$scope.hideStuff;
      $('.stuffContent').addClass('animated zoomIn');
    };

    $scope.photo = {};

    $scope.takePhoto = function(){
      takepicture();
      $scope.photo = photo.currentSrc;
      debugger;
    };


    $scope.savePic = function(){
      //console.log('scope.photo', JSON.stringify($scope.photo);
      User.update($scope.photo).then(function(response){
        $scope.photo = response.data.profilePic;
        debugger;
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
  }]);
})();
