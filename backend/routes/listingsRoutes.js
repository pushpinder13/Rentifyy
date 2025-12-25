const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdminOrOwner } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Create listing
router.post('/', authenticateToken, isActiveUser, asyncHandler(listingsController.createListing));

// Get all listings (public)
router.get('/', asyncHandler(listingsController.getAllListings));

// Get specific listing (public)
router.get('/:id', asyncHandler(listingsController.getListingById));

// Update listing
router.put('/:id', authenticateToken, isAdminOrOwner, asyncHandler(listingsController.updateListing));

// Delete listing
router.delete('/:id', authenticateToken, isAdminOrOwner, asyncHandler(listingsController.deleteListing));

module.exports = router;