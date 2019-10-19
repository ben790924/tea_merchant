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

module.exports = router;