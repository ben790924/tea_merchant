const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// routes
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
//connect db
const db = require('./config/keys.js').mongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('----MongoBD connected----')
        })
        .catch(err => {
            console.log(err)
        })
//passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport)

// 登入頁面
app.use('/api/users', users) // 訪問 固定的api/users/xxx, xxx代表 users.js 裡面的接口名
app.use('/api/profiles', profiles) 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`port is running at ${PORT}`)
});