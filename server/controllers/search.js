'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    Search.getLinks('http://www.wendys.com/', function(links){
      async.each(links, linkIterator, function(err){
        if(err){
          reply('error');
        }else{
          reply('success');
        }
      });
    });
  }
};

function linkIterator(link, cb){
  Search.getImages(link, function(imageLinks){
    console.log('Links call: ', imageLinks);
    cb(imageLinks);
  });
}


