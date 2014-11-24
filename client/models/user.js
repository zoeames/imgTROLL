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

      function show(){
        return $http.get('/profile');
      }

      function getAll(){
        return $http.get('/users');
      }

      function update(pic){
        return $http.put('/profile', {profilePic: pic});
      }

      function checkSession(){
        return $http.get('/checkSession');
      }

      return {register:     register,
              login:        login,
              logout:       logout,
              show:         show,
              getAll:       getAll,
              update:       update,
              checkSession: checkSession
             };

    }]);

})();
