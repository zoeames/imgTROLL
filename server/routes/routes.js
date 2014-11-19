'use strict';

//import controller here
var home = require('../controllers/home');
var user = require('../controllers/user');

module.exports = [
  {method: 'GET',    path: '/',           config: home.index},
  {method: 'GET',    path: '/about',      config: home.about},
  {method: 'GET',    path: '/users',      config: user.users},
  {method: 'GET',    path: '/users/{id}', config: user.show},
  {method: 'GET',    path: '/{params*}',  handler: {directory: {path: 'public'}}}

];
