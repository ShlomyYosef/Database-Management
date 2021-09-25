const express = require("express");
const router = express.Router();
var Client = require("./db/mongoose");
// filter clients by name
router.get("/", function (req, res) {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("filter", { clientList: foundClients });
    }
  });
});

module.exports = router;
