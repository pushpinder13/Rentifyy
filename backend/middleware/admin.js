const { verifyToken } = require('../config/jwt');
const { Listing } = require('../models');

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

        // If user is admin, allow access
        if (req.user.role === 'admin') {
            return next();
        }

        // Check if user owns the listing
        const listingId = parseInt(req.params.id);
        const listing = await Listing.findByPk(listingId);
        
        if (!listing) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Listing not found',
                error: 'LISTING_NOT_FOUND'
            });
        }

        if (listing.owner_id !== req.user.id) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Access denied. You can only modify your own listings.',
                error: 'OWNER_REQUIRED'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { isAdmin, isAdminOrOwner };
