const Review = require('../models/Review');
const { Op } = require('sequelize');

// Create a new review with input validation
exports.createReview = async (req, res) => {
    const { listing_id, renter_id, rating, comment } = req.body;
    
    // Validate input
    if (!listing_id || !renter_id || !rating) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    try {
        const review = await Review.create({ 
            listing_id: parseInt(listing_id), 
            renter_id: parseInt(renter_id), 
            rating: parseInt(rating), 
            comment: comment ? comment.trim() : null 
        });
        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a listing with secure parameterized query
exports.getAllReviews = async (req, res) => {
    const { listing_id } = req.params;
    
    // Strict validation - only allow positive integers
    const listingId = parseInt(listing_id, 10);
    if (!listingId || listingId <= 0 || !Number.isInteger(listingId)) {
        return res.status(400).json({ message: 'Invalid listing ID format' });
    }
    
    try {
        const reviews = await Review.findAll({ 
            where: { 
                listing_id: {
                    [Op.eq]: listingId
                }
            },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'listing_id', 'renter_id', 'rating', 'comment', 'createdAt', 'updatedAt']
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.update({ rating, comment });
        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.destroy();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};