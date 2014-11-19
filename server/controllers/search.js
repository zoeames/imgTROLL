'use strict';


var Search = require('../models/search');

exports.crawl = {
  handler: function(request, reply){

    Search.getImages('http://www.wendys.com/', function(links){
      reply(links);
    });
  }
};
