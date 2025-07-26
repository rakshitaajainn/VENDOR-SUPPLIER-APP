// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// --- Middleware ---
// Ensures user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// Ensures user is a vendor
const isVendor = (req, res, next) => {
    if (req.session.role !== 'vendor') {
        return res.status(403).send('Access Denied: Only vendors can place orders.');
    }
    next();
};

// --- Routes ---

// GET: Show form to order a specific product
router.get('/new/:productId', isLoggedIn, isVendor, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('new-order', { product, title: 'Place Order' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST: Create a new order
router.post('/', isLoggedIn, isVendor, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        const totalAmount = product.price * quantity;

        const newOrder = new Order({
            vendor: req.session.userId,
            supplier: product.supplier,
            products: [{
                productId: product._id,
                name: product.name,
                quantity: parseInt(quantity),
                price: product.price
            }],
            totalAmount: totalAmount
        });

        await newOrder.save();
        res.redirect('/orders/my-orders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET: Show all orders for the logged-in user (both vendor and supplier)
router.get('/my-orders', isLoggedIn, async (req, res) => {
    try {
        let orders;
        if (req.session.role === 'vendor') {
            orders = await Order.find({ vendor: req.session.userId }).populate('supplier', 'name').populate('products.productId', 'imageUrl');
        } else { // Supplier
            orders = await Order.find({ supplier: req.session.userId }).populate('vendor', 'name').populate('products.productId', 'imageUrl');
        }
        res.render('my-orders', { orders, userRole: req.session.role, title: 'My Orders' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST: Update order status (for suppliers)
router.post('/update-status/:orderId', isLoggedIn, async (req, res) => {
    // Ensure the user is a supplier and owns this order
    if (req.session.role !== 'supplier') {
        return res.status(403).send('Access Denied');
    }
    
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.orderId);

        // Check if the current user is the supplier for this order
        if (order.supplier.toString() !== req.session.userId) {
             return res.status(403).send('You are not authorized to update this order.');
        }

        order.status = status;
        await order.save();
        res.redirect('/orders/my-orders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
