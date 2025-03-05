const db = require('../config/db');

// Create a new listing
exports.createListing = async (req, res) => {
    const { title, description, category_id, price, location, owner_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Listings (title, description, category_id, price, location, owner_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [title, description, category_id, price, location, owner_id]);
        res.status(201).json({ id: result.insertId, title, description, category_id, price, location, owner_id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating listing' });
    }
};

// Get all listings
exports.getAllListings = async (req, res) => {
    try {
        const [listings] = await db.query('SELECT * FROM Listings');
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching listings' });
    }
};

// Get a single listing by ID
exports.getListingById = async (req, res) => {
    const { id } = req.params;
    try {
        const [listing] = await db.query('SELECT * FROM Listings WHERE id = ?', [id]);
        if (listing.length === 0) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json(listing[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching listing' });
    }
};

// Update a listing
exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, price, location, owner_id } = req.body;
    try {
        const [result] = await db.query('UPDATE Listings SET title = ?, description = ?, category_id = ?, price = ?, location = ?, owner_id = ? WHERE id = ?', 
            [title, description, category_id, price, location, owner_id, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating listing' });
    }
};

// Delete a listing
exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Listings WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting listing' });
    }
};