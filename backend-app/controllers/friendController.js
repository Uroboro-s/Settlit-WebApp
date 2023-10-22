const FriendRequest = require('../models/friendrequest');
const User = require('../models/user');
const Transaction = require('../models/transaction');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

const {getUser, setUser} = require('./currentUser');


//POST the friend request
exports.friendrequest_send_post = asyncHandler(async(req,res,next) =>{
    const currentUserId = await getUser();
    const currentUser = await User.findById(currentUserId).populate("notifications").exec();

    const friendUserExists = await User.findOne({userid: req.body.friend_userid}).exec();
    const allFriends = await User.find({friends: currentUserId}).exec();

    console.log(friendUserExists);
    if(!friendUserExists) {
        res.render('user-friends-page', {
            title: "My friends",
            user: currentUser,
            friends_list: allFriends,
            error: "User does not exist",
        });
        return ;
    }
    
    const friendRequest = new FriendRequest({
        sender: currentUserId,
        reciever: friendUserExists._id,
    })
    console.log(friendRequest);
    await friendRequest.save();

    res.render('user-friends-page', {
        title: "My Friends",
        user: currentUser,
        friends_list: allFriends,
    });
});


//POST the friend-request approval
exports.friendrequest_approve_post = asyncHandler(async(req, res, next) =>{
    const currentUserId = await getUser();
    const currentUser = await User.findById(currentUserId).populate("notifications").exec();

    const request = await FriendRequest.findById(req.params.request_id).exec();

    const friendrequest = new FriendRequest({
        sender: request.sender,
        reciever: currentUserId,
        status: "Accepted",
        _id: req.params.request_id,
    });
    const sender = await User.findById(request.sender).populate('friends').exec();
    
    sender.friends.push(currentUserId);
    currentUser.friends.push(sender._id);

    console.log(sender);
    console.log(currentUser);
    await sender.save();
    await currentUser.save();

    const approvedRequest = await FriendRequest.findByIdAndUpdate(friendrequest._id, friendrequest, {});
    res.redirect(`/users/${currentUser.userid}/friends`);   
});


//POST the friend-request rejection
exports.friendrequest_reject_post = asyncHandler(async (req, res, next) => {
    const currentUserId = await getUser();
    const currentUser = await User.findById(currentUserId).populate("notifications").exec();

    const request = await FriendRequest.findById(req.params.request_id).exec();

    const friendrequest = new FriendRequest({
        sender: request.sender,
        reciever: currentUserId,
        status: "Rejected",
        _id: req.params.request_id,
    });

    const approvedRequest = await FriendRequest.findByIdAndUpdate(friendrequest._id, friendrequest, {});
    res.redirect(`/users/${currentUser.userid}/friends`);   
})