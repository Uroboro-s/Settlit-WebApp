const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userid: {type: String, required: true},
    name: {type: String, required: true},
    
});

module.exports = mongoose.model("User", UserSchema);