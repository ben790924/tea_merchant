const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    
    img: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    hot: {
        type: Boolean,
        default: false
    }
})

module.exports = Product = mongoose.model('product', ProductSchema);