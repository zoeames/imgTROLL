'use strict';

//import controller here
var home = require('../controllers/home');

module.exports = [
  {method: 'GET',    path: '/',           config: home.index},
  {method: 'GET',    path: '/about',      config: home.about},
  {method: 'GET',    path: '/{params*}',  handler: {directory: {path: 'public'}}}
];
