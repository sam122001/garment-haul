const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const CustomerModel = mongoose.model("customer", CustomerSchema);
module.exports = CustomerModel;