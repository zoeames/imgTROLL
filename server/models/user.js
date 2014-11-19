'use strict';

 // name:       {type: String, required: true},
  //age:    {type: Number, required: true},
  //location:    {type: String, required: true}

var mongoose   = require('mongoose'),
    bcrypt     = require('bcrypt'),
    UserSchema = new mongoose.Schema({email: String, password: String}),
    User       = mongoose.model('User', UserSchema);


User.register = function(o, cb){
 this.findOne({email: o.email}, function(err, user){
  if(user || o.password.length < 3 || err){return cb(err);}
  o.password = bcrypt.hashSync(o.password, 10);
  user = new User(o);
  user.save(function(err){
   cb(err, user);
  });
 });
};

module.exports = User;
