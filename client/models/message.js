(function(){
  'use strict';

  angular.module('troll')
    .factory('Message', ['$http', function($http){

      function send(message, receiver, sender){
        return $http.post('/messages', message, receiver, sender);
      }

      function showAll(){
        return $http.get('/allMessages');
      }

      return{send:send, showAll:showAll};

    }]);
})();
