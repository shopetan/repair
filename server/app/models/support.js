// app/models/support.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SupportSchema   = new Schema({
    os: String,
    browser: String
});

module.exports = mongoose.model('Support', SupportSchema);
