'use strict';

var User = require('../models/user');

exports.register = {
    description: 'register',
    notes: 'some register shit!',
    handler: function(req, rep){
        User.create(req.payload, function(err, user){
            rep(user);
        });
    }
};




