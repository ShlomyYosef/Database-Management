const express = require("express");
const router = express.Router();
var User = require("../db/users");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/", function (req, res) {
    res.render("addUser", { message: "" });
  });

router.post("/", function (req, res) {

    bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
        // hash the password we get from the user. myPlaintextPassword
        // the 'hash' from the function(err,hash) is the password after hash+salt
    const newUser = new User({
        Name : req.body.Name,
        Password:hash
    });
    // save new user.
    newUser.save();
    res.render("addUser",{message: "user add successfully"});
});
});

module.exports = router;
