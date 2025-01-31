const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  image: String,
  rating: Number,
  type: String,
  author: String,
  description: String,
  gender: String,
  quantity: Number
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
