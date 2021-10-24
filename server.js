require('dotenv').config()
// Express
const express = require("express");
const app = express();
const session = require('express-session');
// Passport
const passport = require("passport");
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
// use session 
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
// use passport
app.use(passport.initialize());
app.use(passport.session());
// Mongoose
var Client = require("./routes/db/mongoose");
var User = require("./routes/db/users");
// Create routes
const homeRoute = require("./routes/users/loginUser");
const removeRoute = require("./routes/clients/removeClient");
const addRoute = require("./routes/clients/addClient");
const sortRoute = require("./routes/clients/sortClients");
const filterRoute = require("./routes/clients/filterClients");
const clientListRoute = require("./routes/clients/listClient");
const AdminRoute = require("./routes/Admin/Admin");
const AdminAddUserRoute = require("./routes/Admin/addUserAdmin");

// Use routes
app.use("/add", addRoute);
app.use("/remove", removeRoute);
app.use("/sort", sortRoute);
app.use("/filter", filterRoute);
app.use("/login", homeRoute);
app.use("/home", clientListRoute);
app.use("/admin", AdminRoute);
app.use("/addUser", AdminAddUserRoute);


passport.use(User.createStrategy());
passport.serializeUser(function(User, done) {
  done(null, User);
});
passport.deserializeUser(function(User, done) {
  done(null, User);
});
// Home screen localhost:8080
app.get("/",function(req,res)
{
  res.render("login",{message: ""});
});

// Login
app.post("/",function (req, res) {
  var userNameField = req.body.username;
  var passwordField = req.body.password;
  const user = new User({
    username: userNameField,
    email: passwordField
});
req.login(user, function(err) {
    if (err) 
    {
         console.log("err");
    }
    else{
    passport.authenticate("local",{ failureRedirect: '/login'})(req,res, function(err)
    {
      if(err)
      {
        console.log("errorr");
      }
      if (userNameField == "Admin") // admin login 
      {
        User.find({}, function (err, foundUsers) {
          if (err) {
            console.log(err);
          } else {
            res.render("admin", { usersList: foundUsers });
          }
          });
      }
      else {
      Client.find({}, function (err, foundClients) {
        if (err) {
          console.log(err);
        } else {
          res.render("home", { clientList: foundClients });
        }
      });
    }
    });
    }
  });
});

// Listen
app.listen(port, function () {
  console.log("server run at localhost:8080");
});