const express = require("express");
const router = express.Router();
var User = require("../db/users");
const passport = require("passport");

router.get("/", function (req, res) {
  if(req.isAuthenticated())
  {
    const currentUser = req.user.username;
    if(currentUser == "Admin")
    {
    res.render("addUser", { message: "" });
    }
  }
  else{
    res.render("login", { message: "" });
  }
  });


  router.post("/", function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
      if(err){
        console.log("Error in registering.",err);
        res.redirect("/");
      }else{
           res.render("addUser",{ message: "user added successfully" });
      }
  });
  });

module.exports = router;
