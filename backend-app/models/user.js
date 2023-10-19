const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
});

UserSchema.virtual("url").get(function () {
  return `/users/${this.userid}`;
});

module.exports = mongoose.model("User", UserSchema);
