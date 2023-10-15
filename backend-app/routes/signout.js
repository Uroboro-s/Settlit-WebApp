const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const asyncHandler = require("express-async-handler");
// Logout User
router.get("/", userController.user_sign_out);
module.exports = router;
