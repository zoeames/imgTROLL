'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
//    wget           = require('wgetjs'),
    fs             = require('fs'),
    schema = new mongoose.Schema({name: String, mainUrl: String, images: [String]}),
    Search = mongoose.model('Search', schema);


//CLASS METHODS
Search.getLinks = function(website, cb){
  website = removeEndingSlash(website);
  console.log('website in Search.getLinks>>>>>>', website);
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
      console.log('a in Search.getLinks>>>>>>>>>', a);
      cb(a);
    }
  });
};

Search.getImgLinks = function(website, cb){
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
        return imgLink;
      });
      cb(images);

    }
  });
};

Search.downloadFile = function(weblink, userId, root, index){
  var dirName = 'client/assets/' + userId;
  console.log('root in downloadFile>>>>>>>>', root);
  console.log('dirName in downloadFile before first check>>>>>>>>', dirName);

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
  dirName = dirName + '/' + root;
  console.log('dirName in downloadFile after adding root>>>>>>>>', dirName);
  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}

  //fs.mkdirSync(dirName);
  console.log('writing to>>>>>>>>>>>>>> : ', (dirName + '/' + index + '.png'));
  requestWebsite(weblink).pipe(fs.createWriteStream(dirName + '/' + index + '.png'));
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

//function downloadImg(photos){
//  photos.map(function(photo, index){
//    wget(photo);

//    wget(photo, callback);

//    wget({photo: photo, dest: __dirname + }, callback);

//    wget({photo: photo, dry: true});

//  });
//}