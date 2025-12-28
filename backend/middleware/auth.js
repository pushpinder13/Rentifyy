const { verifyToken } = require('../config/jwt');
const { User } = require('../models');
const { NotFoundError } = require('./errorHandler');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ 
                status: 'error',
                message: 'No authorization header provided',
                error: 'NO_AUTH_HEADER'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                status: 'error',
                message: 'No token provided',
                error: 'NO_TOKEN'
            });
        }

        const decoded = verifyToken(token);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid token',
                error: 'INVALID_TOKEN'
            });
        }

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid token format',
                error: 'INVALID_TOKEN_FORMAT'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                status: 'error',
                message: 'Token has expired',
                error: 'TOKEN_EXPIRED'
            });
        }
        next(error);
    }
};

// Middleware to check if user is self or admin
const isSelfOrAdmin = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ 
                status: 'error',
                message: 'Access denied. You can only access your own data.',
                error: 'FORBIDDEN'
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware to check if user is active
const isActiveUser = async (req, res, next) => {
    try {
        if (!req.user.is_active) {
            return res.status(403).json({
                status: 'error',
                message: 'Your account is inactive. Please contact support.',
                error: 'INACTIVE_ACCOUNT'
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authenticateToken, isSelfOrAdmin, isActiveUser };
