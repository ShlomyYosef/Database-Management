const express = require("express");
const router = express.Router();
var Client = require("../db/mongoose");

router.get("/", function (req, res) {
  res.render("sort");
});

// order ascending DB
router.post("/ascending", function (req, res) {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { clientList: foundClients });
    }
  }).sort({ Name: 1 });
});
// order descending DB
router.post("/descending", function (req, res) {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { clientList: foundClients });
    }
  }).sort({ Name: -1 });
});

module.exports = router;
