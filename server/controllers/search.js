'use strict';

var requestWebsite = require('request'),
    cheerio        = require('cheerio');

exports.crawl = {
  handler: function(request, reply){
    requestWebsite('http://www.cnn.com', function(error, response, body){
      if (!error && response.statusCode === 200){
        var $ = cheerio.load(body);
        anchortags = $('a');
        console.log(anchortags);
        reply(body);
      }
    });
  }
};


