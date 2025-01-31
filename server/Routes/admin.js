const express = require("express");
const router = express.Router();
const ProductModel = require("../models/AllProducts")

router.post('/addProduct', async (req, res) => {
    try {
        const { name, image, price, description, category, rating, type, quantity } = req.body;
        console.log(name, 'name');
        
        // Create a new product using ProductModel
        const product = await ProductModel.create({ name, image, price, description, category, rating, type,quantity });
        res.json(product);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;