'use strict';

var User = require('../../../models/user');


module.exports = {
    description: 'All Users',
    notes: 'All Users',
    tags:['users'],
    handler: function(request, reply){
        User.find(function(err, users){
        console.log('USER SERVER SIDE', users);
        reply({users:users});
    });
    }
};
