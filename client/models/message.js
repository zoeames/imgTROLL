(function(){
  'use strict';

  angular.module('troll')
    .factory('Message', ['$http', function($http){

      function send(message){
        return $http.post('/messages', {message:message});
      }

      function showAll(){
        return $http.get('/allMessages');
      }

      return{send:send, showAll:showAll};

    }]);
})();
