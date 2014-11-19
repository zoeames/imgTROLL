'use strict';

var User = require('../models/user');


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



