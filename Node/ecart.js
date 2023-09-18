var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/ewebdb");

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit:'50mb' ,extended: true}));
app.use(cors());

app.use(express.static('./images'))

var PhoneSchema = mongoose.Schema({
    phone_name: String,
    phone_brand: String,
    phone_price: String,
    phone_ram: String,
    phone_storage: String,
    phone_camera: String,
    phone_image: String
})

var Phone = mongoose.model('Phone',PhoneSchema);

app.get('/',(req,res) => {
    Phone.find({}).then((response) => {
        console.log(response);
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(8000);