'use strict';


var Search = require('../models/search');

exports.crawl = {
  handler: function(request, reply){
    var search = new Search({name: 'MySearch', mainUrl:'http://www.ocharleys.com/', images: []});
    search.scrubImages('000000000000000000000001', function(){
      search.save(function(err, s){
        reply('scrubbed images!');
      });
    });
  }
};
