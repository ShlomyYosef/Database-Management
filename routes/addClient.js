const express = require("express");
const router = express.Router();
const http = require("http");
const isValidIsraeliID = require("../utils/isValidIsraeliID.util");
var Client = require("./db/mongoose");

router.get("/", function (req, res) {
  res.render("add", { message: "Fill the form" });
});
// add client if id valid
router.post("/", function (req, res) {
  const name = req.body.Name;
  const id = req.body.ID;
  if (!isValidIsraeliID(id)) {
    res.render("add", { message: "Error,Please enter valid ID" });
  }
   else {
    const ip = req.body.IP;
    const phoneNumber = "+972-" + req.body.Phone;
    var newClient;
    const url =
      "http://api.ipapi.com/api/" +
      ip +
      "?access_key=8ec9395909a5afa6f29bb428cfd782f2&fields=city,country_name";
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



module.exports = router;
