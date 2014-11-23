'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    fs             = require('fs'),
    async          = require('async'),
    Site           = require('./site.js'),
    schema = new mongoose.Schema({
      name: String,
      mainUrl: {type: String, required: true},
      depths: Array
    }),
    Search = mongoose.model('Search', schema);


//CLASS METHODS
Search.getLinks = function(website, cb){
  requestWebsite({url: website}, function(error, response, body){
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
  requestWebsite({url: website}, function(error, response, body){
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

Search.prototype.urlFinder = function(website, depth, cb){
  if(depth < 0){
    cb();
  }
  website = removeEndingSlash(website);
  var self  = this;

  requestWebsite(website, function(error, response, body){
    if(error){ return cb(); }
    var $ = cheerio.load(body),
    anchorTags = $('a'),
    keys = Object.keys(anchorTags),
    a = keys.map(function(k){
      return extractDepthRoute(anchorTags[k].attribs, website);
    });

    a = _.compact(a);
    a = _.uniq(a);

    //push the extracted linked into a urlsArray
    self.urlsArray.push(a);


    async.forEach(a, function(url, cbOne){
      self.depthFinder(url, depth - 1, cbOne);
    }, function(err){
        //console.log('Depth: ', depth);
        cb(self.urlsArray);
    });
  });
};

Search.prototype.scrubImages = function(website, userId, baseSite, bigCB){
    var self = this;
    website = removeEndingSlash(website);
    var fileName = extractSiteFilename(website);

    //begin scrubbing
    Search.getLinks(website, function(links){
      var index = 1;
      async.forEach(links, function(link, cbOne){

        Search.getImages(link, function(imageLinks){

          async.forEach(imageLinks, function(link, cbTwo){
            //download the link
            Search.downloadFile(link, fileName, self.name, index, function(imgPath){
              if(imgPath){
                //console.log(imgPath);
                self.images.push(imgPath);
              }
              cbTwo();
            });
            //increment global index
            index++;

          //INNER ASYNC
        }, function(err, cbOne){
              cbOne();
            });
        }); //END OF Search.getImages

      //OUTTER ASYNC
    },function(err, bigCB){
        self.images = _.uniq(self.images);
        self.images = _.compact(self.images);
//        clearTimeout(timer); //need to clear timer if this callback happens first
        bigCB();
      });
    }); //END OF Search.getLinks
};

Search.downloadFile = function(weblink, fileName, root, index, cb){
  var dirName   = 'client/assets/' + fileName,
  //    imagePath = dirName + '/' + root,
      absPath  = dirName + '/' + index + '.png';

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
//  if(!fs.existsSync(imagePath)){fs.mkdirSync(imagePath);}

  if(index > 50){
    return cb(null);
  }

  requestWebsite.head(weblink, function(err, res, body){
    if(err){
      return cb(null);
    }else{
      //console.log('content-type:', res.headers['content-type']);
      //console.log((/^image/).test(res.headers['content-type']));
      if(!(/^image/).test(res.headers['content-type'])){
        cb('');
      }else{
        requestWebsite(weblink).pipe(fs.createWriteStream(absPath))
        .once('close', function(){
          cb(absPath);
        }).setMaxListeners(30);
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
  if(link === undefined || link.href === undefined){ return; }

  if(re.test(link.href)){
    //append root to beginning of relative link
    return root + link.href.match(re)[0];
  }else{
    var rootTest = new RegExp(root);

    // test if local link is already absolute
    if(link.href.match(rootTest)){
      return(link.href);
    }
  }
}

function extractDepthRoute(link, root){
  var rootReg = new RegExp(root);

  //check if undefined
  if(link === undefined || link.href === undefined){ return; }

  //append root site to relative link
  link = absImageRoute(link.href);

  if(!(link).match(rootReg)){
    if(!(/^http:\/\//).test(link)){
      return;
    }else{
      return link;
    }
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

function extractSiteFilename(website){
  var siteArray = website.split('/'),
  site = siteArray[2];
  siteArray = site.split('.');
  site = siteArray.join('-');
  //console.log('site in extractSiteFilename', site);
  return site;
}
