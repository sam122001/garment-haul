const express = require("express");
const router = express.Router();
const CustomerModel = require("../models/customer")

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;       
        const customer = await CustomerModel.create({ name, email, message });
        res.json(customer);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  });

router.get('/getcontact', async(req,res) => {
    console.log('customer hit');
    try {
        const customer = await CustomerModel.find();
        res.json(customer);
    }
    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
      const messageId = req.params.id;
      // Check if the message exists
      const customer = await CustomerModel.findById(messageId);
      if (!customer) {
        return res.status(404).json({ message: 'Message not found' });
      }
      // Delete the message from the database
      await CustomerModel.findByIdAndDelete(messageId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

  
  module.exports = router;