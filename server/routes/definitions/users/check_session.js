'use strict';

module.exports = {
  description: 'Check cookie',
  tags:['users'],
  handler: function(request, reply){
    var user = request.auth.credentials;
    delete user.password;
    reply(user || {username: 'anon'});
  }
};
