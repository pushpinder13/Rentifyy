const db = require('../config/db');

// Create a new review
exports.createReview = async (req, res) => {
    const { listing_id, renter_id, rating, comment } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Reviews (listing_id, renter_id, rating, comment) VALUES (?, ?, ?, ?)', [listing_id, renter_id, rating, comment]);
        res.status(201).json({ id: result.insertId, listing_id, renter_id, rating, comment });
    } catch (error) {
        res.status(500).json({ error: 'Error creating review' });
    }
};

// Get all reviews for a listing
exports.getAllReviews = async (req, res) => {
    const { listing_id } = req.params;
    try {
        const [reviews] = await db.query('SELECT * FROM Reviews WHERE listing_id = ?', [listing_id]);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const [reviews] = await db.query('SELECT * FROM Reviews WHERE id = ?', [id]);
        if (reviews.length > 0) {
            res.status(200).json(reviews[0]);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching review' });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const [result] = await db.query('UPDATE Reviews SET rating = ?, comment = ? WHERE id = ?', [rating, comment, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Review updated successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating review' });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Reviews WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting review' });
    }
};