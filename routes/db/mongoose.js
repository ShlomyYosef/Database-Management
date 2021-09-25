var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Admin:12345@cluster0.0njoq.mongodb.net/Humanz");
var Schema = mongoose.Schema;

const clientSchema = new Schema({
  Name: String,
  ID: String,
  IP: String,
  Phone: String,
  Country: String,
  City: String,
});

module.exports = mongoose.model("clients", clientSchema);
