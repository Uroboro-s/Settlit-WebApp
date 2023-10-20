const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  senderImg: { type: String },
  message: { type: String, minLength: 3, maxLength: 200, required: true },
});

module.exports = mongoose.model("Notification", notificationSchema);
