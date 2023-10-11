const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
});

module.exports = mongoose.model("Credential", CredentialSchema);