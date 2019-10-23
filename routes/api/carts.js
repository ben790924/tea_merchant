const express = require('express');
const Cart = require('../../model/Cart');
const router = express.Router();
const passport = require('passport');


router.post('/cart', (req, res) => {
    const {title, fee, img, quantity, size} = req.body;
    const shopCart = {
        title, fee, img, quantity, size
    }
    new Cart(shopCart).save().then(cart => {
        res.json(cart)
    }).catch(err => {
        res.json({'錯誤': err})
    })
})
router.get('/getCart/:id', (req, res) => {
    Cart.find({}).then(cart => {
        // let filterCart = cart.filter(item => {
        //     return item._id === req.params.id
        // })
        let myCart = cart.map(res => {
            console.log(res._id);
            
        })
        res.json(cart)
    })
})



module.exports = router;