'use strict';

var requestWebsite = require('request'),
    cheerio        = require('cheerio');

exports.crawl = {
  handler: function(request, reply){
    requestWebsite('http://www.ocharleys.com/', function(error, response, body){
      if (!error && response.statusCode === 200){
        var $ = cheerio.load(body),
        anchorTags = $('a');
        var keys = Object.keys(anchorTags),
        //console.log(keys);
        a = keys.map(function(k){
          return anchorTags[k].attribs;
        });

        console.log(a);

        reply({a: anchorTags});
      }
    });
  }
};


