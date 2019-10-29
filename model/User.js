const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profiles: [{
        type: Schema.Types.ObjectId,
        ref: 'profile'
    }]
    
})

module.exports = User = mongoose.model('users', UserSchema);