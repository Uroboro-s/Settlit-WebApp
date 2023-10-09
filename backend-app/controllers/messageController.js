const Message = require('../models/message');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Group = require('../models/group');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const { getUser } = require('./currentUser');

exports.message_create_post = asyncHandler(async(req, res, next) =>{
    const currentUserID = await getUser();
    const currentUser = await User.findById(currentUserID).exec();

    const group = await Group.findById(req.params.group_id).populate("members").exec();
    console.log(group);

    //console.log(req.body['money[]']);
    const transactions = [];
    let i =0;
    for(const money of req.body['money[]'])
    {
        if(money === '0') {
            i++;
            continue;
        }
           
        const transaction = new Transaction({
            sender: currentUserID,
            reciever: group.members[i]._id,
            amount: money,
            
        });
        
        transactions.push(transaction);
        await transaction.save();
    }
    
    //console.log(transactions);

    const message = new Message({
        subject: req.body.subject,
        sender: currentUserID,
        transactions: transactions, 
    });
    await message.save();
    //console.log(message.sender);
    //console.log(message);

    (group.messages).push(message._id);
    console.log(group);
    const updatedGroup = await Group.findByIdAndUpdate(group._id, group, {});

    res.send("successful");

});