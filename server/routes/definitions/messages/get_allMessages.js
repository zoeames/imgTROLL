'use strict';

var Message = require('../../../models/message');

module.exports = {
	description: 'all messages',
	handler: function(request, reply){
		var sender = Message.where({id: request.payload}),
			receiver = Message.where({id: request.payload});
		Message.findOne(sender).populate('sender').exec(function(err, sender){
			Message.findOne(receiver).populate('receiver').exec(function(err, receiver){
				Message.find(function(err, messages){
					reply({data:messages});
				});
			});
		});
	}
};