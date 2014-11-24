/**
 * Created by matt on 11/19/14.
 */

var mongoose = require('mongoose'),
    //User     = require('./user'),
    MessageSchema = new mongoose.Schema(
        {body: String, sender: String, receiver: String}),
    Message = mongoose.model('Message', MessageSchema);



module.exports = Message;
