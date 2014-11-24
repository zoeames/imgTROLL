(function(){
  'use strict';

  angular.module('troll', ['ui.router', 'LocalForageModule', 'angular-carousel'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',      {url:'/',              templateUrl:'/views/home/home.html',             controller: 'HomeCtrl'})
        .state('register',  {url:'/register',      templateUrl:'/views/register/register.html',     controller:'RegCtrl'})
        .state('login',     {url:'/login',         templateUrl:'/views/login/login.html',           controller:'LoginCtrl'})
        .state('profile',   {url:'/profile',       templateUrl:'/views/profile/profile.html',       controller:'ProCtrl'})
        .state('users',     {url:'/users',         templateUrl:'/views/showall/showall.html',       controller:'ShowCtrl'})
        .state('crawler',     {url:'/search',         templateUrl:'/views/crawler/crawler.html',       controller:'CrawlerCtrl'})
        .state('messages',     {url:'/messages',      templateUrl:'/views/messages/messages.html',    controller:'MsgCtrl'})
        .state('allMessages',  {url:'/allMessages',   templateUrl:'/views/messages/allMessages.html', controller:'MsgCtrl'});
        //.state('profile',     {url:'/profile',       templateUrl:'/views/users/profile.html',     controller:'ProfileCtrl'});
        //.state('users',     {url:'/users',         templateUrl:'/views/users/users.html',       controller:'UsersCtrl'})
        //.state('show',      {url:'/users/{id}',    template:'/views/show/show.html',            controller:'ShowCtrl'})
        //.state('messages',  {url:'/messages/{id}', templateUrl:'/views/messages/messages.html', controller:'MsgCtrl'});


      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }]);
})();
