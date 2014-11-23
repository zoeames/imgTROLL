'use strict';


var Search  = require('../models/search'),
    _       = require('underscore');
//    async   = require('async');

exports.crawl = {
  handler: function(request, reply){
    // this will be passed in through request.payload
    // var site = request.payload....,
    //  depth   = request.payload....;

    var site = 'http://www.mcdonalds.com/',
    depth = 1,

    search = new Search({name: 'MySearch', mainUrl: site, depths: []});

    Search.urlValidate(site, function(err, success){
      if(err){
        reply('Error- invalid url');
      }else{
        search.urlFinder(search.mainUrl, depth, function(depthUrls){

          var urlsArray = _.flatten(depthUrls);
          search.depths = urlsArray;
          search.save(function(err, success){
            reply('scrubbed images!');
          });
        });
      }
    });
  }
};
