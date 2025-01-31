const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authModel'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    quantity: {
        type: Number
    }

}, { timestamps: true })

const authModel = mongoose.model("carts",EmployeeSchema)
module.exports = authModel