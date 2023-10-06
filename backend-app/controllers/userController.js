const User = require('../models/user');
const Group = require('../models/group');

const asyncHandler = require('express-async-handler');

const {body, validationResult} = require('express-validator');

const {getUser} = require('./currentUser');

//GET the home page of Active User
exports.user_get_home = asyncHandler(async(req, res, next) =>{
    const currentUserId = getUser();
    
    const currentUser = await User.findById(currentUserId).exec();
    console.log(currentUser);
    if(currentUser === null || currentUser.userid !== req.params.user_id) {
        res.send("Unauthorized access");
        return ;
    }
    const user = await User.findOne({userid: req.params.user_id}).exec();
    res.render('user-home-page', {
        title: "Home",
        user: user,
    });
});

exports.user_get_myaccount = asyncHandler(async(req, res, next) =>{

});

exports.user_get_mygroups = asyncHandler(async(req, res, next) =>{
    const currentUserId = getUser();
    
    const currentUser = await User.findById(currentUserId).exec();
    if(currentUser === null || currentUser.userid !== req.params.user_id) {
        res.send("Unauthorized access");
        return ;
    }
    const GroupsofUser = await Group.find({members: [currentUserId]}, "")

});

exports.user_get_myfriends = asyncHandler(async(req, res, next) =>{

});

exports.user_get_myindividuals = asyncHandler(async(req, res, next) =>{

});