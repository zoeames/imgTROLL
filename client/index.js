(function(){
  'use strict';

  angular.module('troll', ['ui.router', 'LocalForageModule'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');


      $stateProvider
        .state('home',         {url:'/',              templateUrl:'/views/home/home.html',            controller: 'HomeCtrl'})
        .state('register',     {url:'/register',      templateUrl:'/views/register/register.html',    controller:'RegCtrl'})
        .state('login',        {url:'/login',         templateUrl:'/views/login/login.html',          controller:'LoginCtrl'})
        .state('profile',      {url:'/profile',       templateUrl:'/views/profile/profile.html',      controller:'ProCtrl'})
        .state('users',        {url:'/users',         templateUrl:'/views/showall/showall.html',      controller:'ShowCtrl'});
        .state('messages',     {url:'/messages',      templateUrl:'/views/messages/messages.html',    controller:'MsgCtrl'})
        .state('allMessages',  {url:'/allMessages',   templateUrl:'/views/messages/allMessages.html', controller:'MsgCtrl'});


      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }]);
})();
