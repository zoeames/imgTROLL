'use strict';

var User = require('../../../models/user');


module.exports = {
    description: 'User Profile',
    notes: 'User Profile',
    tags:['user'],
    //validate: {
      //  params: {
      //      id: Joi.string().length(24).required()
      //  }
  //  },
    handler: function(request, reply){
        console.log('REQUEST.PAYLOAD', request.payload);
        User.findOne({username:request.payload}, function(err, user){
        console.log('USER SERVER SIDE', user);
        reply({user:user});
    });
    }
};

/*
module.exports = {
  description: 'Profile',
  notes: 'The Profile page',
  tags:['profile'],
  handler: function(request, reply){
    reply({data:'Profile Page'});
  }
};
*/
