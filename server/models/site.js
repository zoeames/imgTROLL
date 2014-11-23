'use strict';

var mongoose    = require('mongoose'),
//requestWebsite  = require('request'),
//cheerio         = require('cheerio'),
_               = require('underscore'),
fs              = require('fs'),
async           = require('async'),
schema = new mongoose.Schema({
  name: String,
  siteUrl: {type: String, required: true},
  images: Array
}),
Site = mongoose.model('Site', schema);

Site.prototype.extractSiteFilename = function(){
  var siteArray = this.split('/'),
  site = siteArray[2];
  siteArray = site.split('.');
  site = siteArray.join('-');
  //console.log('site in extractSiteFilename', site);
  return site;
};
