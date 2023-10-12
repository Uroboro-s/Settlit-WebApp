const  express = require('express');
const  router = express.Router();

const userController = require('../controllers/userController');
const groupController = require('../controllers/groupController');
const messageController = require('../controllers/messageController');
const transactionController = require('../controllers/transactionController');

/* GET users listing which should'nt be possible*/
router.get('/', function(req, res, next) {
  let message = "404 not found"
  const error = new Error(message);
  error.status = 404;
  res.render('error', {message: message, error: error});
});

//GET the home page for a user
router.get('/:user_id', userController.user_get_home);

//GET the 'My Account' page for user
router.get('/:user_id/account', userController.user_get_myaccount);

//GET the 'My Groups' page for user
router.get('/:user_id/groups', userController.user_get_mygroups);

//GET the 'My Friends' page for user
router.get('/:user_id/friends', userController.user_get_myfriends);

//GET the 'My Individuals' page for user
router.get('/:user_id/individuals', userController.user_get_myindividuals);




//Group Routes below**

//POST the group-create form
router.post('/:user_id/groups/group/create', groupController.group_create_post);

//GET the group message window
router.get('/:user_id/groups/group/:group_id', groupController.group_message_window_get);

//POST the message-create form 
router.post('/:user_id/groups/group/:group_id/createmsg', messageController.message_create_post);



//Transaction Routes below**

//POST the transaction pay request
router.post('/:user_id/transactions/:transaction_id/pay', transactionController.transaction_pay_post);



module.exports = router;
