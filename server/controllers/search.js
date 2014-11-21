'use strict';


var Search  = require('../models/search'),
    _       = require('underscore'),
    async   = require('async');

exports.crawl = {
  handler: function(request, reply){

    var site = 'http://www.mcdonalds.com/',

    //TO BE REMOVED

    search = new Search({name: 'MySearch', mainUrl: site, images: [], urlsArray: []});
    search.depthFinder(search.mainUrl, 1, function(depthUrls){


      Search.urlValidate(site, function(err, xyz){
        if(err){
          reply('Error- invalid url');
        }else{
          var search = new Search({name: 'MySearch', mainUrl: site, images: []}),
          urlsArray  = _.flatten(depthUrls);

          //God help us all.
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
      }); //Search.urlValidate end
    }); //search.depthFinder end

  }
};
