const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
// routes
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const products = require('./routes/api/products')
const carts = require('./routes/api/carts')
//connect db
const db = require('./config/keys.js').mongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => {
            console.log('----MongoBD connected----')
        })
        .catch(err => {
            console.log(err)
        })
//passport 序列化
passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
//passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// 測試專區
app.post('/api/localAuth', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    console.log('req.session', req.body)
    res.json({success: true})
})
cloudinary.config({
  cloud_name: 'dgikzmdar',
  api_key: '761486532254961',
  api_secret: 'KA-iJ3YmQQ5v1D9ZUC29JuJbqA0'
})
app.post('/api/cloudinaryDelete', (req, res) => {
  cloudinary.v2.api.delete_resources(req.body.public_ids, {resource_type: 'image'}, (err, result) => {
    res.json({err, result})
  });
})

//測試專區

app.use('/api/users', users) // 訪問 固定的api/users/xxx, xxx代表 users.js 裡面的接口名
app.use('/api/profiles', profiles) 
app.use('/api/products', products)
app.use('/api/carts', carts)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`port is running at ${PORT}`)
});