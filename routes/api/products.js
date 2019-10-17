const express = require('express');
const Product = require('../../model/Product');
const router = express.Router();

/* 
    $route  GET api/profiles/test
    @desc   返回json數據
    @access public
*/
router.get('/producttest', (req, res) => {
    res.json('product test working')
})

/* 
    $route  POST api/profiles/addProduct
    @desc   新增產品項(分別是否為熱門)
    @access public
*/
router.post('/addProduct', (req, res) => { 
    const {title, description, fee, img, hot} = req.body

    Product.create({
        img,
        title,
        description,
        fee,
        hot
    }).then(item => {
        res.json(item)
    })
})

/* 
    $route  GET api/profiles/getProduct
    @desc   取得所有產品
    @access public
*/
router.get('/getProduct', (req, res) => {
    Product.find({}).then(item => {
        res.json(item)
    })
})

/* 
    $route  DELETE api/profiles/deleteProduct
    @desc   刪除商品
    @access public
*/
router.delete('/deleteProduct', (req, res) => {

    const { title } = req.body
    Product.deleteOne({title}).then(item => {
        res.json(item)
    })
})

module.exports = router;