'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    var site = 'http://thehackernews.com/';

    //TO BE REMOVED
/*
    var search = new Search({name: 'MySearch', mainUrl: site, images: []});
    search.depthFinder(search.mainUrl, 3, function(){
      reply('it worked');
    });
*/

    Search.urlValidate(site, function(err, success){
//      console.log('Err in urlValidate>>>>>', err);
//      console.log('Success in urlValidate>>>>>', success);

      if(err){
        reply('Error- invalid url');
      }else{
        var search = new Search({name: 'MySearch', mainUrl: site, images: []}),
        urlsArray  = [site, 'http://www.ocharleys.com'];

        async.forEach(urlsArray, function(url, cb){
          search.scrubImages(url, '000000000000000000000001', site, function(err){
            cb();
          });
        }, function(){
          search.save(function(err, s){
            reply('scrubbed images!');
          });
        });
      }
    });

  }
};
