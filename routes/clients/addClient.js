const express = require("express");
const router = express.Router();
const http = require("http");
const isValidIsraeliID = require("../../utils/isValidIsraeliID.util");
var Client = require("../db/mongoose");
const passport = require("passport");


router.get("/", function (req, res) {
  if(req.isAuthenticated())
  {
    res.render("add", { message: "Fill the form" });
  }
  else{
    res.send("user not authenticated");
  }
});


// add client if id valid
router.post("/", function (req, res) {
  const name = req.body.Name;
  const id = req.body.ID;
  if (!isValidIsraeliID(id)) {
    res.render("add", { message: "Error,Please enter valid ID" });
  }
  /*if (isIdExists(id))
  {
    res.render("add", { message: "Error,ID already in the system" });
  }
  */
   else {
    const ip = req.body.IP;
    const phoneNumber = "+972" + req.body.Phone;
    var newClient;
    const url =
      "http://api.ipapi.com/api/" +
      ip +
      "?access_key=" + process.env.API_KEY + "&fields=city,country_name";
    http.get(url, function (response) {
      response.on("data", function (data) {
        const ipData = JSON.parse(data);
        const city = ipData.city;
        const country = ipData.country_name;
        newClient = new Client({
          Name: name,
          ID: id,
          IP: ip,
          Phone: phoneNumber,
          Country: country,
          City: city,
        });
        Client.insertMany(newClient, function (err) {
          if (err) {
            console.log(err);
          }
          res.render("add", { message: "Client added Successfully" });
        });
      });
    });
  }
});
/*
function isIdExists(id)
{
  Client.find({ID: id}, function (err, foundClients) {
    if(foundClients.ID === id)
    {
    console.log(JSON.stringify(foundClients));
      return true;
    }
    else
    {
      console.log(JSON.stringify(foundClients));
      return false;
    }

  });
}

*/

module.exports = router;
