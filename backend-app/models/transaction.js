const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    reciever: {type: Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: true},
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Cancelled", "Successful"],
        default: "Pending",
    },
    date_created: {type: Date, default: Date.now},
    date_modified: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Transaction", TransactionSchema);