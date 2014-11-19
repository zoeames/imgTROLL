'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    Search.getLinks('http://www.wendys.com/', function(links){
      console.log('links in Search.getLinks', links);
      async.each(links, linkIterator, function(err,links){
        if(err){
          reply('error');
        }else{
          console.log('links in async func>>>>>>>', links);
          reply('success');
        }
      });
    });
  }
};

exports.saveFile = {
  handler: function(request, reply){
    Search.downloadFile('http://www.old-radio.info/wp-content/uploads/2014/09/cute-cat.jpg', '1', 'cnn', 3);
    reply('success');
  }
};


function linkIterator(link, cb){
  Search.getImgLinks(link, function(imageLinks){
    console.log('imageLinks in linkIterator>>>>>>>> ', imageLinks);
    cb(imageLinks);
  });
}
