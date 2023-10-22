const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FriendrequestSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
    reciever: {type: Schema.Types.ObjectId, ref: "User", required: true},
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Rejected", "Accepted"],
        default: "Pending",
    }
});

module.exports = mongoose.model("FriendRequest", FriendrequestSchema);