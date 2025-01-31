const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const ProductModel = require("../models/AllProducts")
const authUser = require("../middleware/authUser");
const authModel = require("../models/authModel");

// get all cart products
router.get("/fetchcart", authUser, async (req, res) => {
  try {
    const cardDetails = await Cart.find({ user: req.user.id });

    const productIds = cardDetails.map((detail) => detail.productId);
    const productDetailsPromises = productIds.map((productId) =>
      ProductModel.findOne({ _id: productId })
    );
    const productDetails = await Promise.all(productDetailsPromises);

    const userIds = cardDetails.map((detail) => detail.user);
    const userDetailsPromises = userIds.map(userId => authModel.findOne({_id: userId}));
    const userDetails = await Promise.all(userDetailsPromises);

    const result = cardDetails.map((detail, index) => ({
        _id: detail._id,
        user: {
            _id: userDetails[index]._id,
            email: userDetails[index].email
        },
        productId: {
            _id: productDetails[index]._id,
            name: productDetails[index].name,
            price: productDetails[index].price,
            image: productDetails[index].image,
            type: productDetails[index].type,
            rating: productDetails[index].rating
        },
        quantity: detail.quantity,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt,
        __v: detail.__v
    }));

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// add to cart

router.post("/addcart", authUser, async (req, res) => {
  try {
    const { _id, quantity } = req.body;
    const findProduct = await Cart.findOne({
      $and: [{ productId: _id }, { user: req.user.id }],
    });
    if (findProduct) {
      return res.status(400).json({ msg: "Product already in cart" });
    } else {
      const cart = new Cart({
        user: req.user.id,
        productId: _id,
        quantity,
      });
      const savedCart = await cart.save();
      res.send(savedCart);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// remove from cart
router.delete("/deletecart/:id", authUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Cart.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
