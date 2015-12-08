// app/models/edit.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EditSchema   = new Schema({
    e_id: String,
    u_id: String
});

module.exports = mongoose.model('Edit', EditSchema);
