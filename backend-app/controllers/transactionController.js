const Transaction = require('../models/transaction');
const User = require('../models/user');
const Message = require('../models/message');
const Group = require('../models/group');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

const {getUser} = require('../controllers/currentUser');


//Handle the transaction-pay route on POST
exports.transaction_pay_post = asyncHandler(async(req, res, next) =>{
    const currentUserId = await getUser();
    
    const currentUser = await User.findById(currentUserId).exec();
    if(currentUser === null || currentUser.userid !== req.params.user_id) {
        res.send("Unauthorized access");
        return ;
    }
    const transaction = await Transaction.findById(req.params.transaction_id, {}).exec();
    transaction.status = "Successful";
    transaction.date_modified = Date.now();

    const message = await Message.find({transactions: req.params.transaction_id}).exec();
    const group = await Group.find({messages: message[0]._id}).exec();

    await Transaction.findByIdAndUpdate(req.params.transaction_id, transaction, {}).exec();
    const url = `/users/${currentUser.userid}/groups/group/${group[0]._id}`;
    res.redirect(url);
});