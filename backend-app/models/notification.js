const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // sender: { type: String },
  senderImg: { type: String },
  message: { type: String, minLength: 3, maxLength: 120, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      "friendRequest",
      "groupAddition",
      "greeting",
      "moneyRequest",
      "changePassword",
    ],
    default: "greeting",
  },
  status: {
    type: String,
    required: true,
    enum: ["read", "notRead"],
    default: "notRead",
  },
  dateSent: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Notification", notificationSchema);
