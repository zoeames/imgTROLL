(function(){
  'use strict';

  angular.module('troll', ['ui.router', 'LocalForageModule'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');


      $stateProvider
        .state('home',      {url:'/',              templateUrl:'/views/home/home.html'})
        .state('register',  {url:'/register',      templateUrl:'/views/users/users.html',       controller:'UsersCtrl'})
        .state('login',     {url:'/login',         templateUrl:'/views/users/users.html',       controller:'UsersCtrl'})
        .state('profile',      {url:'/profile',    templateUrl:'/views/profile/profile.html',   controller:'ProCtrl'})
        .state('users',     {url:'/users',         templateUrl:'/views/showall/showall.html',   controller:'ShowCtrl'})
        .state('messages',  {url:'/messages',      templateUrl:'/views/messages/messages.html', controller:'MsgCtrl'})
        .state('allMessages',  {url:'/allMessages',      templateUrl:'/views/messages/allMessages.html', controller:'MsgCtrl'});
        //.state('profile',     {url:'/profile',       templateUrl:'/views/users/profile.html',     controller:'ProfileCtrl'});
        //.state('users',     {url:'/users',         templateUrl:'/views/users/users.html',       controller:'UsersCtrl'})
        //.state('show',      {url:'/users/{id}',    template:'/views/show/show.html',            controller:'ShowCtrl'})





      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }]);
})();
