'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    fs             = require('fs'),
    async          = require('async'),
    schema = new mongoose.Schema({name: String, mainUrl: String, images: [String]}),
    Search = mongoose.model('Search', schema);


//CLASS METHODS
Search.getLinks = function(website, cb){
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

Search.getImages = function(website, cb){
  requestWebsite(website, function(error, response, body){
    if (!error && response.statusCode === 200){
      var images = [],
      $ = cheerio.load(body);

      //get all the images
      images = $('img').map(function(index, img){
        return absImageRoute($(img).attr('src'), website);
      });

      //compact and unique images only
      images = _.compact(images);
      images = _.uniq(images);

      //callback with the image links
      cb(images);

    }
  });
};

Search.prototype.scrubImages = function(userId, bigCB){
    var self = this;
    this.mainUrl = removeEndingSlash(this.mainUrl);


    //begin scrubbing
    Search.getLinks(this.mainUrl, function(links){
      var index = 1;
      async.forEach(links, function(link, cbOne){

        Search.getImages(link, function(imageLinks){

          async.forEach(imageLinks, function(link, cbTwo){
            //download the link
            Search.downloadFile(link, userId, self.name, index, function(imgPath){
              self.images.push(imgPath);
              cbTwo();
            });

            //increment global index
            index++;

          //INNER ASYNC
          }, function(err){
              cbOne();
            });
        }); //END OF Search.getImages

      //OUTTER ASYNC
      },function(err){
        console.log('bigCB');
        bigCB();
      });
    }); //END OF Search.getLinks
};

Search.downloadFile = function(weblink, userId, root, index, cb){
  var dirName   = 'client/assets/' + userId,
      imagePath = dirName + '/' + root,
      absPath  = imagePath + '/' + index + '.png';

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
  if(!fs.existsSync(imagePath)){fs.mkdirSync(imagePath);}

  requestWebsite.head(weblink, function(err, res, body){
    if(err){
      cb(null);
    }else{
      console.log('content-type:', res.headers['content-type']);
      console.log((/^image/).test(res.headers['content-type']));
      if(!(/^image/).test(res.headers['content-type'])){
        cb('');
      }else{
        requestWebsite(weblink).pipe(fs.createWriteStream(absPath))
        .on('close', function(){
          cb(absPath);
        });
      }
    }
  });

};

module.exports = Search;


function checkRoute(link, root){
  //relative routes
  var re = new RegExp(/^\/[a-zA-Z0-9\-\/]*/);

  //check undefined
  if(link === undefined){ return; }

  if(re.test(link.href)){
    return root + link.href.match(re)[0];
  }else{
    return;
  }
}

function absImageRoute(link, root){
  var re = new RegExp(/^\/[a-zA-Z0-9\-\/]*/);

  //check undefined
  if(link === undefined){ return; }

  if(re.test(link)){
    return root + link.match(re)[0];
  }else{
    return link;
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

