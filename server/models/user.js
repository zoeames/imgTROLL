'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({email: String, password: String});
var User = mongoose.model('User', userSchema);


User.register = function(o, cb){
 User.findOne({email:o.email}, function(err, user){
  if(user || o.password.length < 3){return cb();}
  var u = new User(o);
  User.save(u, cb);
 });
};

User.login = function(o, cb){
 User.findOne({email:o.email}, function(err, user){
  if(!user){return cb();}
  var isOk = bcrypt.compareSync(o.password, user.password);
  if(!isOk){return cb();}
  cb(null, user);
 });
};


module.exports = User;




