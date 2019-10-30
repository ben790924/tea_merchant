const express = require('express');
const mongoose = require('mongoose');
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

/* 
    $route  GET api/users/populateUser
    @desc   透過 USER 的 objectId 收尋到 User 的個人資訊
    @access public
*/
router.get('/populateUser/:_id', (req, res) => {
  User.find({_id: new mongoose.Types.ObjectId(req.params._id)}).populate('profiles').exec((err, profiles) => {
      res.json(profiles)
  })
})
/* 
    $route  PUT api/users/updateUser/:filterId
    @desc   使用者想更新profile的接口
    @access public
*/
router.put('/updateUser/:filterId', (req, res) => {
    Profile.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.filterId)}, req.body, {new: true})
    .then(profile => {
        res.json({profile, success: true})
    })
})
/* 
    $route  POST api/users/emailValid
    @desc   驗證是否有email
    @access public
*/
router.post('/emailValid', (req, res) => {
    const { email } = req.body
    User.findOne({ email }).then(email => {
        if(email) {
            res.json({success: false, msg: '信箱已註冊過'})
        } else {
            res.json({success: true})
        }
    })
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
                res.json({msg: '信箱已註冊過摟!', fail: true});
            } else {
                const {name, email, password, message, telephone, address} = req.body;
                // gravatar
                const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    email,
                    password
                });
                const newProfile = new Profile({
                    avatar,
                    name,
                    message,
                    telephone,
                    address
                })
                newProfile.save()
                newUser.profiles.push(newProfile)
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({data: user, finalSuccess: true, success: true});
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
                    
                    jwt.sign(rule, keys.secretKey, {expiresIn: '12h'}, (err, token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: 'bearer ' + token,
                            id: rule.id,
                            name: rule.name,
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
    @desc   返回 current user (用戶資訊)
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

/* 
    $route  GET api/users/check
    @desc   返回 
    @access public
*/
router.get('/check', (req, res, next) => {
    if(req.cookies.sid) {
        res.json(req.cookies.sid)
    }
})


module.exports = router;