// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    is_login: Boolean,
    edit_programs: [{ type: Schema.Types.ObjectId, ref: 'EditProgram' }]
});

module.exports = mongoose.model('User', UserSchema);
