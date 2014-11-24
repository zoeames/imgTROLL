(function(){
  'use strict';

  angular.module('troll')
    .factory('Crawler', ['$http', function($http){

      function search(query){
        return $http.post('/search', query);
      }

      function getImages(){
        return $http.get('/images');
      }

      return {search: search, getImages:getImages};

    }]);

})();
