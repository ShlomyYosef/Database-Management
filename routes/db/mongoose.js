var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect(process.env.MONGODB);
var Schema = mongoose.Schema;

const clientSchema = new Schema({
  Name: String,
  ID: String,
  IP: String,
  Phone: String,
  Country: String,
  City: String,
});
clientSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("clients", clientSchema);
