// app/models/edit_program.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EditProgramSchema   = new Schema({
    name: String,
    type: String,
    source: String,
    supports:[{ type: Schema.Types.ObjectId, ref: 'Support' }]
});

module.exports = mongoose.model('EditProgram', EditProgramSchema);
