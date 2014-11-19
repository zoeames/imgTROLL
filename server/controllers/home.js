'use strict';

exports.index = {
  description: 'Home',
  notes: 'The Home page',
  tags:['home'],
  handler: function(request, reply){
    reply({data:'Home Page'});
  }
};

exports.about = {
  description: 'About',
  notes: 'The About page',
  tags:['about'],
  handler: function(request, reply){
    reply({data:'About Page'});
  }
};

