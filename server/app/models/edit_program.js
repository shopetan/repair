// app/models/edit_program.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EditProgramSchema   = new Schema({
    os: String,
    browser: String
});

module.exports = mongoose.model('EditProgram', EditProgramSchema);
