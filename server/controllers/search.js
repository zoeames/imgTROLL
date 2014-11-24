'use strict';


var Search  = require('../models/search'),
    _       = require('underscore'),
    async   = require('async');

exports.crawl = {
  handler: function(request, reply){
    var site = 'http://www.espn.com/',
    search = new Search({name: 'MySearch', mainUrl: site, images: [], limit: 0, statistics: []});


    search.depthFinder(search.mainUrl, 1, function(depthUrls){
      Search.urlValidate(site, function(err, xyz){
        if(err){
          reply('Error- invalid url');
        }else{
          //flatten the array of arrays
          var urlsArray  = _.uniq(_.flatten(depthUrls));
          if(urlsArray.length > 75){
            urlsArray = urlsArray.splice(0, 75);
          }else if(!urlsArray.length){
            reply('no images founds');
          }

          //God help us all.
          async.forEachLimit(urlsArray, 20, function(url, cb){
              search.scrubImages(url, '000000000000000000000001', function(err){
                  cb();
              });
          }, function(){
           search.save(function(err, s){
             reply(search.statistics);
           });
          });
        }
      }); //Search.urlValidate end
    }); //search.depthFinder end

  }
};
