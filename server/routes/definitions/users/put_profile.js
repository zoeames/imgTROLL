'use strict';

var User = require('../../../models/user');

module.exports = {
  description: 'update pic',
  auth: false,
  handler: function(request, reply){
    User.findOneAndUpdate(request.username, request.payload, function(err, user){
      reply(user);
    });
  }
};
