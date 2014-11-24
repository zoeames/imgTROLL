'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    fs             = require('fs'),
    async          = require('async'),
    schema = new mongoose.Schema({
      name: String,
      mainUrl: {type: String, required: true},
      images: [String],
      urlsArray: Array,
      limit: Number,
      statistics: Array,
      userId: mongoose.Schema.Types.ObjectId
    }),
    Search = mongoose.model('Search', schema);

Search.getImages = function(website, cb){
  requestWebsite({url: website, timeout: 3000}, function(error, response, body){
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
  }).on('error', function(){
    return;
  });
};


Search.prototype.depthFinder = function(website, depth, cb){
  website = removeEndingSlash(website);
  var self  = this;

  requestWebsite({url: website, timeout: 3000}, function(error, response, body){
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

    if(depth <= 0){
      cb();
    }else{
      async.forEachLimit(a, 3, function(url, cbOne){
        self.depthFinder(url, depth - 1, cbOne);
      }, function(err){
          cb(self.urlsArray);
      });
    }
  }).on('error', function(){
    return;
  });
};

Search.prototype.scrubImages = function(website, userId, bigCB){
    var self = this;
    website = removeEndingSlash(website);

    //give em' their data anyways
    var timer = setTimeout(function(){
      self.images = _.uniq(self.images);
      self.images = _.compact(self.images);
      bigCB();
      clearTimeout(timer);
    }, 15000);

    Search.getImages(website, function(imageLinks){
      self.statistics.push({url: website, images: imageLinks.length || 0});
      async.forEachLimit(imageLinks, 5, function(link, cb){
        self.downloadFile(link, userId, self.name, function(){
          cb(null);
        });
      }, function(err){
          self.images = _.uniq(self.images);
          self.images = _.compact(self.images);
          clearTimeout(timer);
          bigCB();
        });
    });
};

Search.prototype.downloadFile = function(weblink, userId, root, cb){
  var dirName   = 'client/assets/img/' + userId,
      imagePath = dirName + '/' + root,
      absPath  = imagePath + '/' + this.limit + '.png',
      relPath  = 'assets/img/' + userId + '/' + root + '/' + this.limit + '.png',
      self = this;

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
  if(!fs.existsSync(imagePath)){fs.mkdirSync(imagePath);}


  //prevent too many images
  if(this.limit > 300){
    return cb(null);
  }else{
    this.limit++;
  }

  requestWebsite.head({url: weblink, followRedirect: false, maxRedirects: 0, timeout: 3000}, function(err, res, body){
    if(err || !(/^image/).test(res.headers['content-type'])){
      return cb(null);
    }else{
      self.images.push(relPath);

      requestWebsite({url: weblink, followRedirect: false, maxRedirects: 0, timeout: 3000}).pipe(fs.createWriteStream(absPath))
      .on('close', function(){
        cb(null);
      })
      .on('error', function(){
         //error catching for requests
         cb(null);
      });
    }
  }).on('error', function(){
    //error catching for headers
    cb(null);
  });

};

Search.urlValidate = function(site, cb){
  requestWebsite(site, function(error, response, body){
    cb(error);
  }).on('error', function(){
    cb(null);
  });
};


module.exports = Search;


function extractDepthRoute(link, root){
  var rootReg = null;
  try {
    rootReg = new RegExp(root);
  }
  catch(error){
    return;
  }


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
