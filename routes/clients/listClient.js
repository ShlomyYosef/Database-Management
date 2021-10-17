const express = require("express");
const router = express.Router();
var Client = require("../db/mongoose");


router.get("/", function (req, res) {
  if(req.isAuthenticated())
  {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { clientList: foundClients });
    }
  });
  }
  else{
    res.render("login", { message: "user not authenticated" });
  }
});

module.exports = router;
