const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {};

    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        success: true,
        products,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    product.user = req.user._id;
    await product.save();
    
    res.status(201).json({
        success: true,
        data: product
    });
});

// Other controller methods (getProduct, updateProduct, deleteProduct, etc.)
// would follow the same pattern...

