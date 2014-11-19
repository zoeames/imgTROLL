'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name:       {type: String, required: true},
    age:    {type: Number, required: true},
    location:    {type: String, required: true}
});