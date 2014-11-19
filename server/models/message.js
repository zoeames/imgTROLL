/**
 * Created by matt on 11/19/14.
 */

var mongoose = require('mongoose'),
    //User     = require('./user'),
    Schema   = mongoose.Schema,
    MessageSchema = new mongoose.Schema(
        {body: String, sender: {type: Schema.Types.ObjectId, ref: 'User'}, receiver: {type: Schema.Types.ObjectId, ref: 'User'}}),
    Message = mongoose.model('Message', MessageSchema);



module.exports = Message;
