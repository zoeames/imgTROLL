'use strict';

var Joi  = require('joi'),
    User = require('../models/user');


exports.register = {
    description: 'register',
    notes: 'some register shit!',
    handler: function(req, rep){
        User.register(req.payload, function(err, user){
            rep(user);
        });
    }
};


exports.login = {
    description: 'login',
    handler: function(req, rep){
        User.findOne(req.payload, function(err, user){
            rep(user);
        });
    }
};


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


exports.getAll = {
    description: 'All registered users',
    notes: 'Users',
    tags:['Users'],
    handler: function(request, reply){
        User.find().exec(function(err, users){
            reply(users);
        });
    }
};

exports.checkSession = {
    handler: function(request, reply){
        console.log(request.auth.session);
    }
};
