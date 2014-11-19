'use strict';


var Search = require('../models/search');

exports.crawl = {
  handler: function(request, reply){
    Search.getLinks('http://www.imgur.com/', function(links){
      reply(links);
    });
  }
};


