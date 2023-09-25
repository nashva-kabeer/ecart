var express = require("express");
var router = express.Router();

const Phone = require('./model/phone');
const Cart = require('./model/cart');

router.get('/',(req,res) => {
    Phone.find({}).then((response) => {
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
});

router.get("/cart",(req,res)=>{
    Cart.find({}).then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post("/cart",(req,res)=>{

    var product = req.body;
        console.log(product.phone_name);

    Cart.findOne({ phone_name: product.phone_name }).then((foundProduct) => {
        console.log(foundProduct);
        if (foundProduct) {
            console.log(foundProduct);
            if (product.quantityChange === 1) {
                foundProduct.quantity += 1;
            } else if (product.quantityChange === -1 && foundProduct.quantity > 0) {
                foundProduct.quantity -= 1;
            }
            foundProduct.subtotal = foundProduct.quantity * foundProduct.phone_price;
            foundProduct.save().then((updatedProduct) => {
                res.json(updatedProduct);
                console.log(foundProduct.subtotal);
                console.log(foundProduct.quantity);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
        } else {
            var newCart = new Cart({
                phone_name: product.phone_name,
                phone_price: product.phone_price,
                phone_image: product.phone_image,
                quantity: 1,
                subtotal: product.phone_price * 1 
            });

            newCart.save().then((response) => {
                res.json(response);
            }).catch((err) => {
                console.log(err);
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.delete("/empty-cart", async (req, res) => {
    try {
      await Cart.deleteMany({});
      res.status(204).json({ message: "Cart emptied successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;