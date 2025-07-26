const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        match: [
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            'Please add a valid phone number'
        ]
    },
    businessName: {
        type: String,
        required: [true, 'Please add your business name'],
        trim: true
    },
    businessType: {
        type: String,
        required: [true, 'Please specify your business type'],
        enum: ['manufacturer', 'wholesaler', 'retailer', 'distributor', 'service-provider']
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.SUPPLIER
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    active: {
        type: Boolean,
        default: true
    },
    // Additional fields for vendor profiles
    gstNumber: {
        type: String,
        trim: true,
        uppercase: true,
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please enter a valid GST number']
    },
    businessAddress: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: {
            type: String,
            default: 'India'
        }
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must not exceed 5']
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Cascade delete products when user is deleted
userSchema.pre('remove', async function(next) {
    await this.model('Product').deleteMany({ user: this._id });
    next();
});

// Example virtual field
userSchema.virtual('fullBusinessAddress').get(function() {
    return `${this.businessAddress.street}, ${this.businessAddress.city}, ${this.businessAddress.state} - ${this.businessAddress.pinCode}, ${this.businessAddress.country}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;

