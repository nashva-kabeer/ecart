const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PhoneSchema = mongoose.Schema({
    phone_name: String,
    phone_brand: String,
    phone_price: String,
    phone_ram: String,
    phone_storage: String,
    phone_camera: String,
    phone_image: String
})

module.exports = mongoose.model('Phone',PhoneSchema);