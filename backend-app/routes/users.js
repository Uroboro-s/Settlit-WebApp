const  express = require('express');
const  router = express.Router();

const userController = require('../controllers/userController');

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






module.exports = router;
