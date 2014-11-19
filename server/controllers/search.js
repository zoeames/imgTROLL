'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    Search.getLinks('http://thehackernews.com/', function(links){
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

exports.saveFile = {
  handler: function(request, reply){
    Search.downloadFile('http://www.old-radio.info/wp-content/uploads/2014/09/cute-cat.jpg', '1', 'cnn', 1);
    reply('success');
  }
};

function linkIterator(link, cb){
  Search.getImages(link, function(imageLinks){
    //console.log('Links call: ', imageLinks);
    cb(imageLinks);
  });
}
