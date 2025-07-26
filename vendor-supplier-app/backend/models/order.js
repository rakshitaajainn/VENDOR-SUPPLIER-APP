const mongoose = require('mongoose');
const { ORDER_STATUS, PAYMENT_METHODS } = require('../config/constants');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    moq: {
        type: Number,
        required: true,
        default: 1
    }
}, {
    _id: false
});

const shippingAddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
}, {
    _id: false
});

const paymentResultSchema = new mongoose.Schema({
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
}, {
    _id: false
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
        type: String,
        required: true,
        enum: Object.values(PAYMENT_METHODS)
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual fields if needed
orderSchema.virtual('formattedTotalPrice').get(function() {
    return `₹${this.totalPrice.toLocaleString('en-IN')}`;
});

orderSchema.methods.isOrderOwnedBy = function(userId) {
    return this.user.toString() === userId.toString();
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

