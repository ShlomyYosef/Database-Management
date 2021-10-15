var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect(process.env.MONGODB);
var Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: String,
  Password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", userSchema);
