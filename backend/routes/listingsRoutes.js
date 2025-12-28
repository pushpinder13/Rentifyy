const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin, isAdminOrOwner } = require('../middleware/admin');
const { validateListing } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

// Create listing
router.post('/', authenticateToken, isActiveUser, validateListing, asyncHandler(listingsController.createListing));

// Get all listings (public)
router.get('/', asyncHandler(listingsController.getAllListings));

// Get all listings for admin (includes inactive)
router.get('/admin/all', authenticateToken, isAdmin, asyncHandler(listingsController.getAllListingsAdmin));

// Get user's own listings
router.get('/my-listings', authenticateToken, isActiveUser, asyncHandler(listingsController.getUserListings));

// Get specific listing (public)
router.get('/:id', asyncHandler(listingsController.getListingById));

// Update listing
router.put('/:id', authenticateToken, isAdminOrOwner, validateListing, asyncHandler(listingsController.updateListing));

// Delete listing
router.delete('/:id', authenticateToken, isAdminOrOwner, asyncHandler(listingsController.deleteListing));

module.exports = router;