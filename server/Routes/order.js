const express = require("express");
const router = express.Router();
const OrderModel = require("../models/OrderModel")

router.get('/orders', async (req, res) => {
    try {
        const products = await OrderModel.find();
        res.json(products);
    }
    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router; // Export the router