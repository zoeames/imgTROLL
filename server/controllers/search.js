'use strict';


var Search = require('../models/search'),
    async  = require('async');

exports.crawl = {
  handler: function(request, reply){
    var site = 'http://www.espn.com/';

    //TO BE REMOVED
/*
    var search = new Search({name: 'MySearch', mainUrl: site, images: []});
    search.depthFinder(search.mainUrl, 3, function(){
      reply('it worked');
    });
*/

    Search.urlValidate(site, function(err, xyz){
//      console.log('Err in urlValidate>>>>>', err);
//      console.log('1 in urlValidate>>>>>', xyz);

      if(err){
        reply('Error- invalid url');
      }else{
        var search = new Search({name: 'MySearch', mainUrl: site, images: []}),
        urlsArray  = [site, 'http://www.ocharleys.com', 'http://www.cnn.com'];

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
    });

  }
};
