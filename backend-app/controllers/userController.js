const User = require("../models/user");
const Group = require("../models/group");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const { getUser, setUser } = require("./currentUser");

//GET the home page of Active User
exports.user_get_home = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();

  const currentUser = await User.findById(currentUserId).exec();
  console.log(currentUser);
  if (currentUser === null || currentUser.userid !== req.params.user_id) {
    res.send("Unauthorized access");
    return;
  }
  const user = await User.findOne({ userid: req.params.user_id }).exec();
  console.log(user);
  res.render("user-dashboard", {
    title: "Home",
    user: user,
  });
});

exports.user_get_myaccount = asyncHandler(async (req, res, next) => {});

exports.user_get_mygroups = asyncHandler(async (req, res, next) => {
  const currentUserId = await getUser();
  console.log("again here");
  const currentUser = await User.findById(currentUserId).exec();
  if (currentUser === null || currentUser.userid !== req.params.user_id) {
    res.send("Unauthorized access");
    return;
  }
  const GroupsofUser = await Group.find(
    { members: currentUserId },
    "name"
  ).exec();

  res.render("user-groups-page", {
    title: "My Groups",
    group_list: GroupsofUser,
    user: currentUser,
  });
});

exports.user_get_myfriends = asyncHandler(async (req, res, next) => {});

exports.user_get_myindividuals = asyncHandler(async (req, res, next) => {});

exports.user_sign_out = asyncHandler(async (req, res, next) => {
  //Set the active user to none
  setUser(null);
  console.log(getUser());
  //Render The home page
  res.redirect("/");
  // res.redirect(`/${getUser()}/account`);
});
