const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, productController.getAllProducts)
    .post(protect, productController.createProduct);

router.route('/:id')
    .get(protect, productController.getProduct)
    .put(protect, productController.updateProduct)
    .delete(protect, productController.deleteProduct);

router.route('/:id/reviews')
    .post(protect, productController.createProductReview);

router.get('/top', productController.getTopProducts);

module.exports = router;

