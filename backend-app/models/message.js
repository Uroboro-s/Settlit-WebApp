const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    subject: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    transactions: [{type: Schema.Types.ObjectId, ref: "Transaction"}],
});

module.exports = mongoose.model("Message", MessageSchema);
