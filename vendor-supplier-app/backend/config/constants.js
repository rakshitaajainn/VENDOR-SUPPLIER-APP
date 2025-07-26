module.exports = {
    // Pagination
    PAGINATION: {
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100,
        DEFAULT_PAGE: 1
    },

    // User roles
    ROLES: {
        ADMIN: 'admin',
        VENDOR: 'vendor',
        SUPPLIER: 'supplier',
        CUSTOMER: 'customer'
    },

    // Order statuses
    ORDER_STATUS: {
        PENDING: 'pending',
        PROCESSING: 'processing',
        SHIPPED: 'shipped',
        DELIVERED: 'delivered',
        CANCELLED: 'cancelled',
        RETURNED: 'returned'
    },

    // Payment methods
    PAYMENT_METHODS: {
        UPI: 'upi',
        CARD: 'card',
        NET_BANKING: 'net_banking',
        COD: 'cod',
        WALLET: 'wallet'
    },

    // Payment status
    PAYMENT_STATUS: {
        PENDING: 'pending',
        COMPLETED: 'completed',
        FAILED: 'failed',
        REFUNDED: 'refunded',
        PARTIALLY_REFUNDED: 'partially_refunded'
    },

    // Product categories
    PRODUCT_CATEGORIES: [
        'Electronics',
        'Machinery',
        'Raw Materials',
        'Industrial Supplies',
        'Packaging',
        'Chemicals',
        'Textiles',
        'Automotive',
        'Construction',
        'Food Products',
        'Medical Supplies',
        'Others'
    ],

    // Supported languages
    LANGUAGES: {
        ENGLISH: 'en',
        HINDI: 'hi',
        TAMIL: 'ta',
        TELUGU: 'te',
        BENGALI: 'bn',
        GUJARATI: 'gu',
        KANNADA: 'kn',
        MALAYALAM: 'ml',
        MARATHI: 'mr',
        PUNJABI: 'pa'
    },

    // Error messages
    ERROR_MESSAGES: {
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'Forbidden',
        NOT_FOUND: 'Resource not found',
        VALIDATION_ERROR: 'Validation failed',
        SERVER_ERROR: 'Internal server error',
        DUPLICATE_KEY: 'Duplicate field value',
        INVALID_CREDENTIALS: 'Invalid credentials',
        ACCOUNT_LOCKED: 'Account locked',
        TOKEN_EXPIRED: 'Token expired'
    },

    // Success messages
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: 'Login successful',
        LOGOUT_SUCCESS: 'Logout successful',
        REGISTER_SUCCESS: 'Registration successful',
        UPDATE_SUCCESS: 'Update successful',
        DELETE_SUCCESS: 'Delete successful',
        PASSWORD_RESET_SENT: 'Password reset link sent',
        PASSWORD_RESET_SUCCESS: 'Password reset successful'
    },

    // Rate limiting
    RATE_LIMIT: {
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        MAX_REQUESTS: 100
    },

    // JWT configuration
    JWT: {
        ACCESS_TOKEN_EXPIRE: '15m',
        REFRESH_TOKEN_EXPIRE: '7d',
        ISSUER: 'BizConnect API',
        AUDIENCE: 'BizConnect Client'
    }
};

