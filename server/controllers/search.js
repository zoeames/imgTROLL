'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    var search = new Search({name: 'MySearch', mainUrl:'http://www.ocharleys.com', images: []}),
    urlsArray  = ['http://www.ocharleys.com', 'http://www.cnn.com'];

    async.forEach(urlsArray, function(url, cb){
      search.scrubImages(url, '000000000000000000000001', function(err){
        cb();
      });
    }, function(){
      search.save(function(err, s){
        reply('scrubbed images!');
      });
    });
  }
};
