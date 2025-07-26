// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Middleware to check if user is a logged-in supplier
function isSupplier(req, res, next) {
    if (req.session.userId && req.session.role === 'supplier') {
        return next();
    }
    res.status(403).send('Access denied. Only suppliers can add products.');
}

// Show all products
router.get('/', async (req, res) => {
    const products = await Product.find().populate('supplier', 'name'); // Show supplier name
    res.render('products', { products });
});

// Show form to add a new product
router.get('/new', isSupplier, (req, res) => {
    res.render('new-product');
});

// Handle new product form submission
router.post('/new', isSupplier, async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
        imageUrl,
        supplier: req.session.userId
    });
    await newProduct.save();
    res.redirect('/products');
});

module.exports = router;
