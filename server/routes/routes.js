'use strict';

//import controller here
var home    = require('../controllers/home'),
    user    = require('../controllers/user'),
    message = require('../controllers/message');

module.exports = [
  {method: 'GET',    path: '/about',      config: home.about},
  {method: 'GET',    path: '/users',      config: user.users},
  {method: 'GET',    path: '/users/{id}', config: user.show},
  {method: 'GET',    path: '/{params*}',  handler: {directory: {path: 'public'}}},
  {method: 'POST',   path: '/register',   config: user.register},
  {method: 'POST',   path: '/login',      config: user.login},
  {method: 'POST',   path: '/messages',      config: message.send},
  {method: 'GET',    path: '/messages',      config: message.showAll},
  {method: 'GET',    path: '/messages/{id}', config: message.showOne}
];
