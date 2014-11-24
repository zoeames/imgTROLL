'use strict';


var Search  = require('../models/search.js'),
    Site    = require('../models/site.js');
//    _       = require('underscore'),
//    async   = require('async');

exports.crawl = {
  handler: function(request, reply){

    //once connected, this info will come in request.payload
    var site    = 'http://www.mcdonalds.com/',
    searchName  = 'MySearch',
    depth       = 1;

    Site.findOne({mainUrl: site}, function(err, site){
      if(site){
        // add userId to this... request.payload?
        var search = new Search({name: searchName, mainUrl: site, depth: depth, depthUrls: []});
        search.getUrls(function(err, search){
          reply(search);
        });
      }else{
        Site.createNew(site, function(err, site, xyz){
          console.log('err in search controller, Site.createNew>>>>>', err);
          console.log('site in search controller, Site.createNew>>>>>', site);
          console.log('xyz in search controller, Site.createNew>>>>>', xyz);

          var search = new Search({name: searchName, mainUrl: site, depth: depth, depthUrls: []});
          search.getUrls(function(err, search){
            reply(search);
          });
        });
      }
    });
  }
};
