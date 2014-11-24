'use strict';

var Message = require('../../../models/message');


module.exports = {
    description: 'Sending message',
    handler: function(req, rep){
        var message = new Message({body: req.payload.body});
        console.log('req.payload', req.payload);
        message.save(function(){
        console.log('message', message);
            rep(message);
        });
    }
};
