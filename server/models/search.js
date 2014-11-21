'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
//    wget           = require('wgetjs'),
    fs             = require('fs'),
    async          = require('async'),
    schema = new mongoose.Schema({
      name: String,
      mainUrl: {type: String, required: true},
      images: [String]}),
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
//      console.log('a in Search.getLinks>>>>>>>>>', a);

      a = _.compact(a);
      a = _.uniq(a);
//      console.log('a in Search.getLinks>>>>>>>>>', a);
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

Search.prototype.depthFinder = function(website, depth, cb){
  website = removeEndingSlash(website);
  requestWebsite(website, function(error, response, body){
    var $ = cheerio.load(body),
    anchorTags = $('a'),
    keys = Object.keys(anchorTags),
    a = keys.map(function(k){
      return extractDepthRoute(anchorTags[k].attribs, website);
    });

    a = _.compact(a);
    //console.log(a);
    cb();
  });
};

Search.prototype.scrubImages = function(website, userId, bigCB){
    var self = this;
    website = removeEndingSlash(website);

    var timer = setTimeout(function(){
      //console.log('>>>>>>>>>>>>>>>timer called');
      bigCB();
      clearTimeout(timer);
    }, 15000);

    //begin scrubbing
    Search.getLinks(website, function(links){
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
        //console.log('bigCB');
        self.images = _.compact(self.images);
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

  if(index > 250){
    return cb(null);
  }

  requestWebsite.head(weblink, function(err, res, body){
    if(err){
      cb(null);
    }else{
      //console.log('content-type:', res.headers['content-type']);
      //console.log((/^image/).test(res.headers['content-type']));
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

Search.urlValidate = function(site, cb){
  requestWebsite(site, function(error, response, body){
    cb(error);
  });
};


module.exports = Search;


function checkRoute(link, root){
  //relative routes
  var re = new RegExp(/^\/[a-zA-Z0-9\-\/]*/);

  //check undefined
  if(link === undefined){ return; }

  if(re.test(link.href)){
    //append root to beginning of relative link
    return root + link.href.match(re)[0];
  }else{
    //if local link is already absolute, return as is
    // TODO (/root/).test(link);
    return ;
  }
}

function extractDepthRoute(link, root){
  var rootReg     = new RegExp(root),
  relative = new RegExp(/^\/[a-zA-Z0-9\-\/]*/);

  //check if undefined
  if(link === undefined || link.href === undefined){ return; }

  //append root site to relative link
  link = absImageRoute(link.href);

  if(!(link).match(rootReg) && relative.test(link)){
    return link;
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
