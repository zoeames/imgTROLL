'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',      config: require('../definitions/general/static')},
  {method: 'post',   path: '/register',      config: require('../definitions/users/post_register')},
  {method: 'post',   path: '/login',         config: require('../definitions/users/post_login')},
  {method: 'delete', path: '/logout',        config: require('../definitions/users/delete_logout')},
  //{method: 'GET',    path: '/about',         config: ''},
  //{method: 'GET',    path: '/users',         config: ''},
  {method: 'get',    path: '/profile',    config: require('../definitions/users/profile')},
  {method: 'get',    path: '/users',    config: require('../definitions/users/showall')}
  //{method: 'POST',   path: '/messages',      config: ''},
  //{method: 'GET',    path: '/messages',      config: ''},
  //{method: 'GET',    path: '/messages/{id}', config: ''}
];
