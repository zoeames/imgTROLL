/**
 * Created by matt on 11/19/14.
 */
'use strict';

var Message = require('../models/message');
    //User    = require('../models/user');

exports.send = {
    description: 'Sending message',
    handler: function(req, rep){
        var message = new Message(req.payload);
        message.save(function(err, message){
            rep(message);
        });
    }
};

exports.showAll = {
    description: 'Show all Messages',
    handler: function(req, rep){
        Message.find(function(err, messages){
            rep(messages);
        });
    }
};

exports.showOne = {
    description: 'Show one Message',
    handler: function(req, rep){
        var query = Message.where({id: req.payload});
        query.findOne(function(err, message){
            rep(message);
        });
    }
};
