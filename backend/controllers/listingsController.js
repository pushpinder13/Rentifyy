const Listing = require('../models/Listing');

// Create a new listing
exports.createListing = async (req, res) => {
    const { title, description, category_id, price, location, owner_id } = req.body;
    try {
        const listing = await Listing.create({ title, description, category_id, price, location, owner_id });
        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all listings
exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.findAll();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a listing by ID
exports.getListingById = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByPk(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a listing
exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, price, location, owner_id } = req.body;
    try {
        const listing = await Listing.findByPk(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await listing.update({ title, description, category_id, price, location, owner_id });
        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a listing
exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByPk(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await listing.destroy();
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};