'use strict';

module.exports = {
  description: 'Check cookie',
  tags:['users'],
  handler: function(request, reply){
    var user = request.auth.credentials;
    delete user.password;

    reply.on('data', function(chunk){
      reply.write(chunk);
    });

    reply.on('end', function(){
      console.log('it worked');
      reply(user);
    });
  }
};
