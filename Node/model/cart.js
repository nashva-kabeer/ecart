const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    phone_name: String,
    phone_price: Number,
    phone_image: String,
    quantity: Number,
    subtotal: Number
})
module.exports = mongoose.model('cart', CartSchema);