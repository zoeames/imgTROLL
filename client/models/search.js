(function(){
  'use strict';

  angular.module('troll')
    .factory('Search', ['$http', function($http){

      function history(){
        return $http.get('/searchHistory');
      }

      return {history: history};

    }]);

})();
