const Order = require('../models/Order');
const Product = require('../models/Product');
const { ErrorResponse } = require('../utils/errorResponse');
const { ORDER_STATUS, PAYMENT_METHODS } = require('../config/constants');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    try {
        if (orderItems && orderItems.length === 0) {
            return next(new ErrorResponse('No order items', 400));
        }

        // Create order
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        // Validate payment method
        if (!Object.values(PAYMENT_METHODS).includes(paymentMethod)) {
            return next(new ErrorResponse('Invalid payment method', 400));
        }

        // Update product stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            
            if (product) {
                product.countInStock -= item.quantity;
                await product.save();
            }
        }

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    } catch (err) {
        next(err);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image price');

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        // Verify order ownership
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to access this order', 401));
        }

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        // Validate status
        if (!Object.values(ORDER_STATUS).includes(req.body.status)) {
            return next(new ErrorResponse('Invalid order status', 400));
        }

        order.status = req.body.status;
        
        if (req.body.status === 'delivered') {
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort('-createdAt');

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'id name')
            .sort('-createdAt');

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

