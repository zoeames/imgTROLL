'use strict';


var Search = require('../models/search');

exports.crawl = {
  handler: function(request, reply){
    var domain = 'http://www.wendys.com';
    Search.getImgLinks(domain, function(links){
        reply(links);
    });
  }
};
