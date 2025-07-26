// models/product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // A simple way to handle bulk pricing
    bulkOptions: [{
        quantity: Number,
        pricePerUnit: Number
    }],
    imageUrl: { type: String }, // URL to the image
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link to the supplier
});

module.exports = mongoose.model('Product', ProductSchema);
