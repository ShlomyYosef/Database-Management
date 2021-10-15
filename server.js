require('dotenv').config()
// Express
const express = require("express");
const app = express();
const session = require('express-session');
const passport = require("passport");
const bcrypt = require('bcrypt');
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

// use session 

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// Home screen localhost:8080
app.get("/",function(req,res)
{
  res.render("login",{message: ""});
});
/*
app.get("/add",function(req,err)
{
  if(req.isAuthenticated()) {
    res.render("home");        
} else {
    res.redirect("/");
}
});
*/

// move this function to other location.
app.post("/",function (req, res) {
  var userNameField = req.body.username;
  var passwordField = req.body.password;
/*  const user = new User({
    Name: userNameField,
    Password: userNameField
  })
  req.login(user,function(err)
  {*/
    passport.authenticate("local");
  if (userNameField == "Admin") // admin login 
  {
    if(passwordField == "admin"){
      User.find({}, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      res.render("admin", { usersList: foundUsers });
    }
    });}
    else{
    res.render("login",{message: "wrong password"});
    }
  }
// user login 
  else{
  User.findOne({Name: userNameField}, function(err, foundUser){
    if(err){
     throw(err);
    }else{
        if(foundUser)
        {
            bcrypt.compare(req.body.password, foundUser.Password, function(err, result) {
                   if (result === true)
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
                  res.render("login",{message: "wrong password"}) 
                }});
        }     
        else {
        res.render("login",{message: "user doesn't exists"})        
      }
  }});
  
}});

// Listen
app.listen(port, function () {
  console.log("server run at localhost:8080");
});


