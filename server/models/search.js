'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    schema = new mongoose.Schema({name: String, mainUrl: String, images: [String]}),
    Search = mongoose.model('Search', schema);


//CLASS METHODS
Search.getLinks = function(website, cb){
  website = removeEndingSlash(website);
  requestWebsite(website, function(error, response, body){
    if (!error && response.statusCode === 200){

      var $ = cheerio.load(body),
      anchorTags = $('a'),
      keys = Object.keys(anchorTags),
      a = keys.map(function(k){
        return checkRoute(anchorTags[k].attribs, website);
      });

      a = _.compact(a);
      a = _.uniq(a);

      cb(a);
    }
  });
};

module.exports = Search;

Search.getImages = function(website, cb){
  website = removeEndingSlash(website);
  requestWebsite(website, function(error, response, body){
    if (!error && response.statusCode === 200){
      var images = [],
      $ = cheerio.load(body);
      images = $('img').map(function(index, img){
        return $(img).attr('src');
      });
      images = _.compact(images);
      images = _.uniq(images);
      //console.log('images before map function', images);
      images = (images).map(function(img, index){
        var imgLink = website + img;
//      imgLink = splitLink(imgLink);
        return imgLink;
      });
      cb(images);

    }
  });
};


module.exports = Search;

//Parse homelinks into http links
function checkRoute(link, root){
  var re = new RegExp(/^\/[a-zA-Z0-9\-\/]*/);
  //check undefined
  if(link === undefined){ return; }

  if(re.test(link.href)){
    return root + link.href.match(re)[0];
  }else{
    return;
  }
}

function removeEndingSlash(website){
  //checks for any string that end with a '/' character
  var removeEnd = new RegExp(/\/$/);
  if(removeEnd.test(website)){
    return website.substring(0, website.length-1);
  }else{
    return website;
  }
}


//function splitLink(link){
//  if(link.indexOf('?')){
//    var linkA = link.split('?');
//    return linkA[0];
//  }else{
//    return link;
//  }
//}

