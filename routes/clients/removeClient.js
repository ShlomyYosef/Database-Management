const express = require("express");
const router = express.Router();
var Client = require("../db/mongoose");
// get the list of all clients
router.get("/", function (req, res) {
  if(req.isAuthenticated())
  {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("remove", { clientList: foundClients });
    }
  });
  }
  else{
    res.send("user not authenticated");
  }
});

// remove client from List of clients where checkbox marked.
router.post("/", function (req, res) {
  const checkedClient = req.body.checkbox;
  Client.findByIdAndDelete(checkedClient, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/remove");
    }
  });
});

module.exports = router;
