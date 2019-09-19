const express = require('express');
const User = require('../../model/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

/* 
    $route  GET api/users/test
    @desc   返回json數據
    @access public
*/
router.get('/test', (req, res) => {
    res.json('router works ---');
})

/* 
    $route  POST api/users/register
    @desc   返回json數據
    @access public
*/
router.post('/register', (req, res) => {
    //檢查資料庫是否有這帳號
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                res.status(400).json({msg: '信箱已註冊過摟!'});
            } else {
                const {name, email, password} = req.body;
                // gravatar
                const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name,
                    email,
                    password,
                    avatar
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json(user);
                            })
                            .catch(err => {console.log(err);})
                    });
                });
            }
        })
})
/* 
    $route  POST api/users/login
    @desc   返回token jwt passport
    @access public
*/
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then(user => {
        if(!user) {
            return res.json('Email不存在呢')
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const rule = {id: user.id, name: user.name, avatar: user.avatar}
                    jwt.sign(rule, keys.secretKey, {expiresIn: 3600}, (err, token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {
                    res.status(400).json('密碼不正確啦')
                }
            })
        
    })
})

/* 
    $route  GET api/users/current
    @desc   返回 current user
    @access private
*/
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    })
})

module.exports = router;