'use strict';

var bcrypt = require('bcrypt'),
    User   = require('../models/user');

module.exports = function(username, password, callback){
    User.findOne({email: username}, function(err, user){
        if(!user){
            return callback(null, false);
        }
        bcrypt.compare(password, user.password, function(err, isValid){
            callback(err, isValid, {id: user._id, name: user.name});
        });
    });
};
