const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {type: String, required: true},
    admin: {type: Schema.Types.ObjectId, ref: "User", required: true},
    members: [{type: Schema.Types.ObjectId, ref: "User", required: true}],
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
});


GroupSchema.virtual('url').get(function() {
    return `/users/:user_id/groups/group/:group_id`;
})
module.exports = mongoose.model("Group", GroupSchema);