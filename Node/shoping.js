var express = require("express");
var router = express.Router();

const Phone = require('./model/phone');
const Cart = require('./model/cart');

router.get('/',(req,res) => {
    Phone.find({}).then((response) => {
        console.log(response);
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
});

router.get("/cart",(req,res)=>{
    Cart.find({}).then((response)=>{
        console.log(response);
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post("/cart",(req,res)=>{
    var product = req.body;
    Cart.find({}).then((response1)=>{
        if(!product.name){
            var newCart = new Cart({
                phone_name: product.name,
                phone_brand: product.brand,
                phone_price: product.price,
                phone_ram: product.ram,
                phone_storage: product.storage,
                phone_camera: product.camera,
                phone_image: product.image,
                quantity: 1,
                subTotal: quantity*price
            })
            newCart.save().then((response1) => {
                res.json(response1);
            }).catch((err) => {
                console.log(err)
            })
        }else{
            let count = 0;
            for(let i =0;i<Cart.length;i++){
                if(Cart.phone_name === name){
                    Cart.quantity += 1;
                    count++;
                }
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
});

/*router.delete("/cart/empty-cart",(req,res)=>{
    
})*/

module.exports = router;