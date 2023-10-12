const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const { getUser, setUser } = require("../controllers/currentUser");
// Logout User
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    //Set the active user to none
    setUser(null);
    //Render The home page
    res.redirect("/");
    // res.redirect(`/${getUser()}/account`);
  })
);

module.exports = router;
