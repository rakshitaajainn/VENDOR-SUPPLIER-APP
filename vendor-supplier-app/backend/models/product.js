const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
        moq: {
            type: Number,
            required: true,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);

