'use strict';

var Message = require('../../../models/message');

module.exports = {
	description: 'all messages',
	handler: function(request, reply){
			Message.find(function(err, messages){
				reply({data:messages});
		});
	}
};
