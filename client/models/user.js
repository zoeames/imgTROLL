(function(){
  'use strict';

  angular.module('troll')
    // .factory('User', ['$http', function($http){
    //   function register(user){
    //     return $http.post('/register', user);
    //   }
    //
    //   function login(user){
    //     return $http.post('/login', user);
    //   }
    //
    //   function logout(){
    //     return $http.delete('/logout');
    //   }
    //
    //   function show(){
    //     return $http.get('/profile');
    //   }
    //   function setUser(user){
    //
    //   }
    //
    //   return {register:register, login:login, logout:logout, show:show};
    // }]);
    .factory('User', ['$http', function($http){

      function getAll(){
        return $http.get('/users');
      }
      
      return {getAll:getAll};



      /*var userobj={};
      userobj.register = function(user){
        return $http.post('/register', user);
      };

      userobj.login = function(user){
        return $http.post('/login', user);
      };

      userobj.logout = function(){
        return $http.delete('/logout');
      };

      userobj.show = function(){
        return $http.get('/profile');
      };

      userobj.setUser = function(user){
        userobj.user = user;
      };

      userobj.getAll = function(){
        return $http.get('/users');
      };

      userobj.update = function(pic){
        return $http.put('/profile', {profilePic: pic});
      };

      return userobj;
    */

    }]);

})();
