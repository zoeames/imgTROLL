'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    Search.getLinks('http://mellowmushroom.com/', function(links){
//      console.log('links in Search.getLinks', links);
      async.each(links, linkIterator, function(err, linkArray){
//        console.log('err in async function>>>>>>', err);
        console.log('linkArray in async function>>>>>>', linkArray);
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
    Search.downloadFile('http://www.old-radio.info/wp-content/uploads/2014/09/cute-cat.jpg', '1', 'cnn', 3);
    reply('success');
  }
};


function linkIterator(link, cb){
  Search.getImgLinks(link, function(imageLinks){
//    console.log('links in linkIterator', imageLinks);
    cb(imageLinks);
  });
}
