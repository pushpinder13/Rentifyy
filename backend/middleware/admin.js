const { verifyToken } = require('../config/jwt');

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Authentication required',
                error: 'AUTH_REQUIRED'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                status: 'error',
                message: 'Access denied. Admin privileges required.',
                error: 'ADMIN_REQUIRED'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

const isAdminOrOwner = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Authentication required',
                error: 'AUTH_REQUIRED'
            });
        }

        const resourceId = parseInt(req.params.id);
        if (req.user.role !== 'admin' && req.user.id !== resourceId) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Access denied. Admin privileges or resource ownership required.',
                error: 'ADMIN_OR_OWNER_REQUIRED'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};


module.exports = { isAdmin, isAdminOrOwner };
