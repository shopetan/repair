// app/models/edit_program.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EditProgramSchema   = new Schema({
    name: String,
    type: String,
    source: String
});

module.exports = mongoose.model('EditProgram', EditProgramSchema);
