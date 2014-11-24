(function(){
  'use strict';

  angular.module('troll')
    .factory('Crawler', ['$http', function($http){

      function search(query){
        return $http.post('/search', query);
      }

      return {search: search};

    }]);

})();
