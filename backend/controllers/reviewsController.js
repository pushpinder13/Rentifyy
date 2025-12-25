const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    const { listing_id, renter_id, rating, comment } = req.body;
    try {
        const review = await Review.create({ listing_id, renter_id, rating, comment });
        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a listing
exports.getAllReviews = async (req, res) => {
    const { listing_id } = req.params;
    try {
        const reviews = await Review.findAll({ where: { listing_id } });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
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