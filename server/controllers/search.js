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
    Search.downloadFile('http://www.wendys.com/en-us/quality-story/cs/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobkey=id&blobtable=MungoBlobs&blobwhere=1365663073159&ssbinary=true', '1', 'cnn', 1);
    reply('success');
  }
};

function linkIterator(link, cb){
  Search.getImages(link, function(imageLinks){
    //console.log('Links call: ', imageLinks);
    cb(imageLinks);
  });
}


