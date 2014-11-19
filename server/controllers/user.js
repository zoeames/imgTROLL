'use strict';

var Joi  = require('joi'),
    Task = require('../models/user');

exports.show = {
    description: 'User Profile',
    notes: 'User Profile',
    tags:['user'],
    validate: {
        params: {
            id: Joi.string().length(24).required()
        }
    },
    handler: function(request, reply){
        User.findOne({_id:request.params.id}).exec(function(err, user){
            reply(user);
        });
    }
};


exports.users = {
    description: 'All registered users',
    notes: 'Users',
    tags:['Users'],
    handler: function(request, reply){
        reply({data:'all Users'});
    }
};




