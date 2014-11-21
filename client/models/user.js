(function(){
  'use strict';

  angular.module('troll')
    .factory('User', ['$http', function($http){

      function register(user){
        return $http.post('/register', user);
      }

      function login(user){
        return $http.post('/login', user);
      }

      function logout(){
        return $http.delete('/logout');
      }

      function update(pic){
        return $http.put('/profile', {profilePic: pic});
      }

      return {register:register, login:login, logout:logout, update:update};
    }]);
})();
