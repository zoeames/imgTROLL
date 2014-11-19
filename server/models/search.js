'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    schema = new mongoose.Schema({name: String, mainUrl: String, images: [String]}),
    Search = mongoose.model('Search', schema);


//CLASS METHODS
Search.getLinks = function(link, cb){
    requestWebsite(link, function(error, response, body){
      if (!error && response.statusCode === 200){

        var $ = cheerio.load(body),
        anchorTags = $('a'),
        keys = Object.keys(anchorTags),
        a = keys.map(function(k){
          return checkRoute(anchorTags[k].attribs);
        });

        a = _.compact(a);
        a = _.uniq(a);

        cb(a);
      }
    });
};

//Parse homelinks into http links
function checkRoute(link){
  var re = new RegExp(/^\/[a-zA-Z0-9\-]*/);

  //check undefined
  if(link === undefined){ return; }

  if(re.test(link.href)){
    //console.log(link.href.match(re)[0]);
    return link.href.match(re)[0];
  }else{
    return;
  }
}

module.exports = Search;

