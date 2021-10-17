var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect(process.env.MONGODB);
var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", userSchema);
