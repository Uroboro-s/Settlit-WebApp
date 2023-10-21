const User = require("../models/user");
const Group = require("../models/group");
const FriendRequest = require('../models/friendrequest');

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const { getUser, setUser } = require("./currentUser");

//GET the home page of Active User
exports.user_get_home = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();

  const currentUser = await User.findById(currentUserId).exec();
  console.log(currentUser);
 /*  if (currentUser === null || currentUser.userid !== req.params.user_id) {
    res.send("Unauthorized access");
    return;
  } */
  console.log()
  const user = await User.findOne({ userid: req.params.user_id }).populate("notifications").exec();
  const testUser = await User.populate(user, {
    path: 'notifications.sender',
    model: 'User',
  });
  console.log(user);
  //console.log(testUser);
  console.log(user.notifications);
  res.render("user-dashboard", {
    title: "Home",
    user: user,
  });
});

exports.user_get_myaccount = asyncHandler(async (req, res, next) => {});


//GET the groups main page of user
exports.user_get_mygroups = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();
  console.log("again here");
  const currentUser = await User.findById(currentUserId).populate("notifications").exec();
  if (currentUser === null || currentUser.userid !== req.params.user_id) {
    res.send("Unauthorized access");
    return;
  }
  const GroupsofUser = await Group.find(
    { members: currentUserId },
    "name admin members description"
  ).exec();

  res.render("user-groups-page", {
    title: "My Groups",
    group_list: GroupsofUser,
    user: currentUser,
  });
});


//GET the friends main page of user
exports.user_get_myfriends = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();
  const currentUser = await User.findById(currentUserId).populate("notifications").exec();
  console.log("jai");
  console.log(currentUserId);
  const allFriends = await User.find({friends: currentUserId}).exec();
  console.log(allFriends);
  const allRequests = await FriendRequest.find({reciever: currentUserId}).populate("sender").exec();
  console.log(allRequests);

  res.render('user-friends-page', {
    title: "My Friends",
    user: currentUser,
    friends_list: allFriends,
    request_list: allRequests,
  });
});



exports.user_get_myindividuals = asyncHandler(async (req, res, next) => {});


//Handle log-out request
exports.user_sign_out = asyncHandler(async (req, res, next) => {
  //Set the active user to none
  setUser(null);
  console.log(getUser());
  //Render The home page
  res.redirect("/");
  // res.redirect(`/${getUser()}/account`);
});
