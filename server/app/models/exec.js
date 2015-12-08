// app/models/source.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExecSchema   = new Schema({
    e_id: String,
    s_id: String
});

module.exports = mongoose.model('Exec', ExecSchema);
