const express = require('express');
const Cart = require('../../model/Cart');
const router = express.Router();
const passport = require('passport');


router.post('/cart', (req, res) => {
    const {title, fee, img, quantity, size, userId} = req.body;
    const shopCart = {
        title, fee, img, quantity, size, userId
    }
    new Cart(shopCart).save().then(cart => {
        res.json(cart)
    }).catch(err => {
        res.json({'錯誤': err})
    })
})
router.get('/getCart/:id', (req, res) => {
    Cart.find({ userId: req.params.id }).then(cart => {
        console.log('getcart',cart)
        res.json(cart)
    })
})



module.exports = router;