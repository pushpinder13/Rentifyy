const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');

// Create a new listing
router.post('/', listingsController.createListing);

// Get all listings
router.get('/', listingsController.getAllListings);

// Get a single listing by ID
router.get('/:id', listingsController.getListingById);

// Update a listing by ID
router.put('/:id', listingsController.updateListing);

// Delete a listing by ID
router.delete('/:id', listingsController.deleteListing);

module.exports = router;