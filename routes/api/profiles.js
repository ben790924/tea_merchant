const express = require('express');
const Profile = require('../../model/Profile');
const passport = require('passport');
const router = express.Router();

/* 
    $route  GET api/profiles/test
    @desc   返回json數據
    @access public
*/
router.get('/test', (req, res) => {
    res.json('profiles works ---');
});

/* 
    $route  POST api/profiles/get
    @desc   返回使用者資料json
    @access private
*/
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userProfile = {};
    if(req.body.name) userProfile.name = req.body.name;
    if(req.body.img) userProfile.img = req.body.img;
    if(req.body.text) userProfile.text = req.body.text;

    // imgs 數組
    if(req.body.imgs) userProfile.imgs = req.body.imgs.split('|');
    new Profile(userProfile).save().then(profile => {
        res.json(profile)
    })
})

module.exports = router;