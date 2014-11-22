'use strict';


var Search  = require('../models/search'),
    _       = require('underscore'),
    async   = require('async');

exports.crawl = {
  handler: function(request, reply){
    var site = 'http://www.ocharleys.com/',
    search = new Search({name: 'MySearch', mainUrl: site, images: [], limit: 0});


    search.depthFinder(search.mainUrl, 2, function(depthUrls){
      Search.urlValidate(site, function(err, xyz){
        if(err){
          reply('Error- invalid url');
        }else{
          //flatten the array of arrays
          var urlsArray  = _.uniq(_.flatten(depthUrls));
          if(urlsArray.length > 200){
            urlsArray = urlsArray.splice(0, 200);
          }

          //God help us all.
          async.forEachLimit(urlsArray, 30, function(url, cb){
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
