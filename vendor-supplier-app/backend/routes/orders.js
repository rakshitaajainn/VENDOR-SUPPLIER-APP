const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderStatus,
    getMyOrders,
    getOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public test route (can be removed in production)
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Orders route working' });
});

// Protected customer/supplier routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin/supplier protected routes
router.put('/:id/status', protect, authorize('admin', 'supplier'), updateOrderStatus);
router.get('/', protect, authorize('admin'), getOrders);

module.exports = router;

