const express = require("express");
const router = express.Router();
var Client = require("../db/mongoose");


router.get("/", function (req, res) {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { clientList: foundClients });
    }
  });
});

module.exports = router;
