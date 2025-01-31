const express = require('express');
const router = express.Router();
const authModel = require('../models/authModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


let success = false

router.post('/register', [
    body('firstName', 'Enter a valid name').isLength({ min: 1 }),
    body('lastName', 'Enter a valid name').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('phoneNumber', 'Enter a valid phone number').isLength({ min: 10, max: 10 })
], async (req, res) => {
    console.log('called');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { firstName, lastName, email, phoneNumber, password, isAdmin } = req.body;
    console.log(req.body, 'req body')
    console.log(authModel, ' authmodel')

    try {
        let user = await authModel.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
        
        if (user) {
            return res.status(400).send({ error: "Sorry, a user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        user = await authModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: secPass,
            isAdmin
        });
        console.log(user, 'user');
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, '29c78a7372661d6e7d7904bab3e2052f45d72a6eb996fb7f3609967a2cb5b8d4');
        
        res.send({ success: true, authToken });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { email, password, } = req.body;
    try {
        let user = await authModel.findOne({ email });
        if (!user) {

            return res.status(400).send({ success, error: "User not found" })
        }
        const passComp = await bcrypt.compare(password, user.password)
        if (!passComp) {
            return res.status(400).send({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = jwt.sign(data, '29c78a7372661d6e7d7904bab3e2052f45d72a6eb996fb7f3609967a2cb5b8d4')
        success = true
        res.send({ success, authToken })
    }
    catch (error) {
        res.status(500).send("Internal server error002")
    }
}
);


module.exports = router;
