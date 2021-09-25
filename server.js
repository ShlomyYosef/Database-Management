// Express
const express = require("express");
const app = express();
// Path
const path = require("path");
// Port
const port = process.env.PORT || 8080;
// Ejs
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
// Parser
app.use(express.urlencoded({ extended: true }));
// Static assets
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
// Mongoose
var Client = require("./routes/db/mongoose");
// Create routes
const removeRoute = require("./routes/removeClient");
const addRoute = require("./routes/addClient");
const sortRoute = require("./routes/sortClients");
const filterRoute = require("./routes/filterClients");
// Use routes
app.use("/add", addRoute);
app.use("/remove", removeRoute);
app.use("/sort", sortRoute);
app.use("/filter", filterRoute);
// Home screen localhost:8080
app.get("/", function (req, res) {
  Client.find({}, function (err, foundClients) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { clientList: foundClients });
    }
  });
});
// Listen
app.listen(port, function () {
  console.log("server run at localhost:8080");
});
