const Group = require("../models/group");
const User = require("../models/user");
const Message = require("../models/message");
const Transaction = require("../models/transaction");
const Notification = require("../models/notification");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const { getUser } = require("../controllers/currentUser");

//POST the group-create form
exports.group_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Group name must be at least 3 characters long and notmore than 100"
    ),

  asyncHandler(async (req, res, next) => {
    const currentUserId = await getUser();

    const currentUser = await User.findById(currentUserId).exec();
    console.log(currentUser);
    if (currentUser === null || currentUser.userid !== req.params.user_id) {
      res.send("Unauthorized access");
      return;
    }
    const errors = validationResult(req);
    const groupNotification = new Notification({
      sender: await User.findById(currentUserId).exec(),
      // senderImg: req.body.user
      message: `${await User.findById(
        currentUserId
      ).exec()} added  you to group ${req.body.name}`,
    });
    const groupMembers = [];
    for (const member of req.body["members[]"]) {
      const userMember = await User.findOne({ userid: member }, "_id")
        .populate("notifications")
        .exec();
      userMember.notifications.push(groupNotification);
      groupMembers.push(userMember);
    }

    groupMembers.unshift(currentUserId);

    const group = new Group({
      name: req.body.name,
      admin: currentUserId,
      description: req.body.description,
      members: groupMembers,
      messages: [],
    });

    const group_list = await Group.find(
      { members: currentUserId },
      "name"
    ).exec();

    if (!errors.isEmpty()) {
      res.render("user-groups-page", {
        title: "My Groups",
        group: group,
        group_list: group_list,
        user: currentUser,
        errors: errors,
      });
      return;
    } else {
      if (groupMembers.includes(null)) {
        res.send("Invalid userid");
      }
      for (const member of req.body["members[]"]) {
        const userMember = await User.findOne({ userid: member }, "_id")
          .populate("notifications")
          .exec();
        await userMember.save();
      }
      await group.save();
      res.redirect(`/users/${currentUser.userid}/groups/group/${group._id}`);
    }
  }),
];

//Display the message window on GET
exports.group_message_window_get = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();
  const user = await User.findById(currentUserId).exec();

  const group = await Group.findById(req.params.group_id)
    .populate("members description messages")
    .exec();
  const allMessages = group.messages;

  const allTransactions = [];
  for (const loop_variable of allMessages) {
    const message = await Message.findById(loop_variable._id)
      .populate("transactions")
      .exec();
    const single_message_transactions = [];
    for (const inner_loop_variable of message.transactions) {
      const transaction = await Transaction.findById(inner_loop_variable._id)
        .populate("sender reciever status amount")
        .exec();
      single_message_transactions.push(transaction);
    }
    allTransactions.push(single_message_transactions);
  }

  res.render("group-message-window", {
    title: "Message Window",
    user: user,
    group,
    allTransactions: allTransactions,
  });
});
