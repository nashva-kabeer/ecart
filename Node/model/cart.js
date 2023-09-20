const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema({
    phone_name: String,
    phone_brand: String,
    phone_price: String,
    phone_ram: String,
    phone_storage: String,
    phone_camera: String,
    phone_image: String,
    quantity: Number,
    subTotal: {
        default: 0,
        type: Number
    }
})
module.exports = mongoose.model('cart', CartSchema);