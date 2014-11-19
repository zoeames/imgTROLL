(function(){
  'use strict';

  angular.module('troll', ['ui.router', 'LocalForageModule'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $localForageProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',      {url:'/',              templateUrl:'/views/home/home.html',         controller:'HomeCtrl'})
    .state('users',     {url:'/users',         templateUrl:'/views/users/users.html',       controller:'UsersCtrl'})
    .state('register',  {url:'/register',      templateUrl:'/views/users/register.html',    controller:'UsersCtrl'})
    .state('login',     {url:'/login',         templateUrl:'/views/users/login.html',       controller:'UsersCtrl'})
    .state('logout',    {url:'/logout',        template:'',                                 controller:'UsersCtrl'})
    .state('show',      {url:'/users/{id}',   template:'/views/show/show.html',            controller:'ShowCtrl'})
    .state('messages',  {url:'/messages/{id}', templateUrl:'/views/messages/messages.html', controller:'MsgCtrl'});


    $localForageProvider.config({name:'troll', storeName:'cache', version:1.0});
    $httpProvider.interceptors.push('HttpInterceptor');
  }])
  .run(['User', '$rootScope', function(User, $rootScope){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    });

  }]);
})();
