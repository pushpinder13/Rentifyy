const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdminOrOwner } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Create review
router.post('/', authenticateToken, isActiveUser, asyncHandler(reviewsController.createReview));

// Get all reviews for a listing
router.get('/listing/:listing_id', asyncHandler(reviewsController.getAllReviews));

// Get specific review
router.get('/:id', asyncHandler(reviewsController.getReviewById));

// Update review
router.put('/:id', authenticateToken, isAdminOrOwner, asyncHandler(reviewsController.updateReview));

// Delete review
router.delete('/:id', authenticateToken, isAdminOrOwner, asyncHandler(reviewsController.deleteReview));

module.exports = router;