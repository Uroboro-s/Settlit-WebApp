const express = require('express');
const router = express.Router();

const authentication_controller = require('../controllers/authenticationController');

//GET the sign-in page
router.get('/', authentication_controller.signin_get);

//Post the sign-in page
router.post('/', authentication_controller.signin_post);

module.exports = router;