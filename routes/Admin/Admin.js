const express = require("express");
const router = express.Router();
var User = require("../db/users");

router.get("/", function (req, res) {
  if(req.isAuthenticated())
  {
  const currentUser = req.user.username;
  if(currentUser == "Admin")
  {
    User.find({}, function (err, foundClients) {
      if (err) {
        console.log(err);
      } else {
        res.render("admin", { usersList: foundClients });
      }
    });
  }
  else{
    res.send("Admin not authenticated");
  }
}
  else {
    res.render("login", { message: ""});
  }
  });

// delete user 
router.post("/", function (req, res) {
    const checkedUser = req.body.checkbox;
    User.findByIdAndDelete(checkedUser, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("admin");
      }
    });
  });

module.exports = router;
