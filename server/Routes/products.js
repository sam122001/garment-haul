const express = require('express');
const router = express.Router();                                    
const ProductModel = require('../models/AllProducts')

router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    }
    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router; // Export the router

