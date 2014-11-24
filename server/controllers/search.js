'use strict';


var Search  = require('../models/search'),
    _       = require('underscore'),
    async   = require('async');

exports.crawl = {
  handler: function(request, reply){

    var site = request.payload.mainUrl,
    search   = new Search({name: site.split(/http:\/\//)[1], mainUrl: site, images: [], limit: 0, statistics: [], userId: request.auth.credentials._id});

    search.depthFinder(site, request.payload.depth, function(depthUrls){
      Search.urlValidate(site, function(err, xyz){
        if(err){
          reply('Error- invalid url');
        }else{
          if(depthUrls === undefined){ return reply({'Error': 'Sorry, they\'ve locked you out. Try again in 5 minutes.'});}

          //flatten the array of arrays
          var urlsArray  = _.uniq(_.flatten(depthUrls));

          if(urlsArray.length > 75){
            urlsArray = urlsArray.splice(0, 75);
          }

          //God help us all.
          async.forEachLimit(urlsArray, 20, function(url, cb){
              search.scrubImages(url, request.auth.credentials._id, function(err){
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

exports.searchHistory = {
  handler: function(request, reply){
    Search.find({userId: request.auth.credentials._id}, function(err, searches){
      if(searches){
        reply(searches);
      }else{
        reply([]);
      }
    });

  }
};
