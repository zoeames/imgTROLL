'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    UserSchema = null,
    User = null;

UserSchema = new mongoose.Schema({
  username:  {type: String, required: true, validate: [usernameV, 'username length'], unique: true},
  password:  {type: String, required: true, validate: [passwordV, 'password length']},
  location: {type: String, required: true, default: 'Edit Me'},
  email: {type: String, required: true, default: 'Edit Me'},
  phoneNum: {type: String, required: true, default: 'Edit Me'},
  age: {type: Number, required: true, default: 0},
  profilePic: {type: String, default: 'http://i2.wp.com/www.maas360.com/assets/Uploads/defaultUserIcon.png'},
  createdAt: {type: Date,  required: true, default: Date.now}
});

UserSchema.methods.encrypt = function(){
  this.password = bcrypt.hashSync(this.password, 10);
};

UserSchema.statics.login = function(obj, cb){
  User.findOne({username: obj.username}, function(err, user){
    if(!user){
     return cb();
    }

    var isGood = bcrypt.compareSync(obj.password, user.password);

    if(!isGood){
      return cb();
    }
    cb(user);
  });
};

function usernameV(v){
  return v.length >= 3 && v.length <= 12;
}

function passwordV(v){
  return v.length === 60;
}

User = mongoose.model('User', UserSchema);
module.exports = User;
