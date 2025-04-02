const errorHandler = (err, req, res, next) => {
    // Log error details
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Handle Sequelize errors
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            status: 'error',
            message: 'Duplicate entry',
            errors: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    if (err.name === 'SequelizeConnectionError') {
        return res.status(503).json({
            status: 'error',
            message: 'Database connection error',
            error: 'DATABASE_ERROR'
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
            error: 'INVALID_TOKEN'
        });
    }
    // Token expired errors
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired',
            error: 'TOKEN_EXPIRED'
        });
    }

    // Handle custom errors
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            error: err.error || 'CUSTOM_ERROR'
        });
    }

    // Handle 404 errors
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            status: 'error',
            message: err.message || 'Resource not found',
            error: 'NOT_FOUND'
        });
    }

    // Default error
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: 'INTERNAL_SERVER_ERROR'
    });
};

// Async handler wrapper to catch async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class for 404 errors
class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

module.exports = { errorHandler, asyncHandler, NotFoundError }; 