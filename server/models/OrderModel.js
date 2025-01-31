const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;