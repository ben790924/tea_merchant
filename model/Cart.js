const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    
    img: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },
    
    fee: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    size: {
        type: Number,
        required: true,
        
    },
    userId: {
        type: String
    }
})

module.exports = Cart = mongoose.model('cart', CartSchema);