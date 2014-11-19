'use strict';

//import controller here
var home   = require('../controllers/home'),
    search = require('../controllers/search');

module.exports = [
  {method: 'GET',    path: '/',           config: home.index},
  {method: 'GET',    path: '/about',      config: home.about},
  {method: 'GET',    path: '/search',     config: search.crawl},
  {method: 'GET',    path: '/dl',         config: search.saveFile},
  {method: 'GET',    path: '/{params*}',  handler: {directory: {path: 'public'}}}
];
