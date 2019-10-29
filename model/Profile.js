const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    telephone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);