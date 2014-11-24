'use strict';

var Message = require('../../../models/message');

module.exports = {
	description: 'all messages',
	handler: function(request, reply){
      var sender = Message.where({id: request.payload});
			sender.find(function(err, messages){
				reply(messages);
		});
	}
};
