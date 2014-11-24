'use strict';

var mongoose       = require('mongoose'),
    requestWebsite = require('request'),
    cheerio        = require('cheerio'),
    _              = require('underscore'),
    fs             = require('fs'),
    async          = require('async'),
    schema = new mongoose.Schema({
      name: {type: String, unique: true},
      mainUrl: {type: String, required: true},
      images: [String],
      urlsArray: Array,
      limit: Number,
      statistics: Array
    }),
    Site = mongoose.model('Site', schema);

Site.createNew = function(site, cb){
    var name = Site.extractSiteFilename(site),
    newSite = new Site({name: name, mainUrl: site, urls: [], images: []});

    cb(newSite);
};

Site.urlValidate = function(site, cb){
  requestWebsite(site, function(error, response, body){
    cb(error);
  });
};

Site.extractSiteFilename = function(website){
  var siteArray = website.split('/'),
  site = siteArray[2];
  siteArray = site.split('.');
  site = siteArray.join('-');
  //console.log('site in extractSiteFilename', site);
  return site;
};

// PENDING...
Site.prototype.depthFinder = function(website, depth, cb){
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
      async.forEach(a, function(url, cbOne){
        self.depthFinder(url, depth - 1, cbOne);
      }, function(err){
        //console.log('Depth: ', depth);
        cb(self.urlsArray);
      });
    }
  }).on('error', function(){
    console.log('Anchor tag timeout');
    return;
  });
};

/*
Site.getLinks = function(website, cb){
  requestWebsite({url: website, timeout: 3000}, function(error, response, body){
    if (!error && response.statusCode === 200){

      var $ = cheerio.load(body),
      anchorTags = $('a'),
      keys = Object.keys(anchorTags),
      a = keys.map(function(k, i){
        if(i > 5){
        return;
        }else{
        return checkRoute(anchorTags[k].attribs, website);
        }
      });

      a = _.compact(a);
      a = _.uniq(a);

      cb(a);
    }
  });
};
*/

// PENDING...
Site.prototype.downloadImages = function(weblink, fileName, root, index, cb){
  var dirName   = 'client/assets/' + fileName,
  //    imagePath = dirName + '/' + root,
      absPath  = dirName + '/' + index + '.png';

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
  //  if(!fs.existsSync(imagePath)){fs.mkdirSync(imagePath);}

  if(index > 50){
    return cb(null);
  }

  requestWebsite.head({url: weblink, timeout: 3000}, function(err, res, body){
    if(err){
      return cb(null);
    }else{
      console.log('content-type:', res.headers['content-type']);
      //console.log('content-type:', res.headers['content-type']);
      //console.log((/^image/).test(res.headers['content-type']));
      if(!(/^image/).test(res.headers['content-type'])){
        cb('');
      }else{
        requestWebsite({url: weblink, timeout: 3000}).pipe(fs.createWriteStream(absPath))
        .once('close', function(){
          cb(absPath);
        }).setMaxListeners(20);
      }
    }
  });
};

/*
Search.prototype.downloadFile = function(weblink, userId, root, cb){
  var dirName   = 'client/assets/' + userId,
  imagePath = dirName + '/' + root,
  absPath  = imagePath + '/' + this.limit + '.png',
  self = this;

  if(!fs.existsSync(dirName)){fs.mkdirSync(dirName);}
  if(!fs.existsSync(imagePath)){fs.mkdirSync(imagePath);}

    //prevent too many images
  if(this.limit > 300){
    //console.log('limit reached');
    return cb(null);
  }else{
    this.limit++;
  }

  requestWebsite.head({url: weblink, followRedirect: false, maxRedirects: 0, timeout: 3000}, function(err, res, body){
    if(err || !(/^image/).test(res.headers['content-type'])){
      //console.log('content-type:', res.headers['content-type']);
      return cb(null);
    }else{
      self.images.push(absPath);

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
*/


module.exports = Site;

// PENDING....
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

// PENDING...
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

//PENDING...
function removeEndingSlash(website){
  //checks for any string that end with a '/' character
  var removeEnd = new RegExp(/\/$/);
  if(removeEnd.test(website)){
    return website.substring(0, website.length-1);
  }else{
    return website;
  }
}
