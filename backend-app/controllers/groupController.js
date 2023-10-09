const Group = require('../models/group');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const {body, validationResult} = require('express-validator');

const {getUser} = require('../controllers/currentUser');


//POST the group-create form
exports.group_create_post = [
    body("name")
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage("Group name must be at least 3 characters long and notmore than 100"),

    asyncHandler(async(req, res, next) =>{
        const currentUserId = await getUser();
    
        const currentUser = await User.findById(currentUserId).exec();
        console.log(currentUser);
        if(currentUser === null || currentUser.userid !== req.params.user_id) {
            res.send("Unauthorized access");
            return ;
        }
        const errors = validationResult(req);

        const groupMembers = [];
        for(const member of req.body['members[]']) {
            groupMembers.push((await User.findOne({userid: member}, "_id").exec()));
        }

        groupMembers.unshift(currentUserId);

        const group = new Group({
            name: req.body.name,
            admin: currentUserId,
            members: groupMembers,
            messages: [],
        });

        const group_list = await Group.find({members: currentUserId}, "name").exec();

        if(!errors.isEmpty()) {
            res.render('user-groups-page', {
                title: "My Groups",
                group: group,
                group_list: group_list,
                user: currentUser,
                errors: errors,
            });
            return ;
        }
        else {
            if(groupMembers.includes(null)) {
                res.send("Invalid userid");
            }
            console.log(group);

            await group.save();
            res.redirect(group.url);
        }
    })
]


//Display the message window on GET
exports.group_message_window_get = asyncHandler(async(req, res, next) =>{
    const currentUserId = await getUser();
    const user = await User.findById(currentUserId).exec();

    const group = await Group.findById(req.params.group_id).exec();
    console.log(group);
    res.render('group-message-window', {
        title: 'Message Window',
        user: user,
        group,
    });
});