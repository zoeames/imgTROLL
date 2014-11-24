'use strict';

var User = require('../../../models/user');


module.exports = {
    description: 'All Users',
    notes: 'All Users',
    tags:['users'],
    handler: function(request, reply){
      User.find(function(err, users){
      reply({users:users});
    });
    }
};
