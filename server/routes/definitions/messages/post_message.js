'use strict';

var Message = require('../../../models/message');


module.exports = {
    description: 'Sending message',
    handler: function(req, rep){
        var message = new Message(req.payload);
        message.save(function(err, message){
            rep(message);
        });
    }
};
