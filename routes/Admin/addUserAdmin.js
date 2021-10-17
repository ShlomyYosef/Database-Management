const express = require("express");
const router = express.Router();
var User = require("../db/users");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require("passport");

router.get("/", function (req, res) {
    res.render("addUser", { message: "" });
  });


  router.post("/", function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
      if(err){
        console.log("Error in registering.",err);
        res.redirect("/");
      }else{
        passport.authenticate("local")(req,res, function(){
          res.redirect("/");
      });
  }});
  
  });

module.exports = router;
