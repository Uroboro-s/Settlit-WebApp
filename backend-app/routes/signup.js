const express = require('express');
const router = express.Router();

const authentication_controller = require('../controllers/authenticationController');

//GET the sign-in the page
router.get('/', authentication_controller.signup_get);

//POST the sign-in page
router.post('/', authentication_controller.signup_post);

module.exports = router;