const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Create a new review
router.post('/', reviewsController.createReview);

// Get all reviews
router.get('/', reviewsController.getAllReviews);

// Get a review by ID
router.get('/:id', reviewsController.getReviewById);

// Update a review by ID
router.put('/:id', reviewsController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;