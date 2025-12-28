const { Listing, User } = require('../models');

// Create a new listing
exports.createListing = async (req, res) => {
    const { title, description, category_id, price, location } = req.body;
    try {
        const listing = await Listing.create({ 
            title, 
            description, 
            category_id, 
            price, 
            location, 
            owner_id: req.user.id,
            status: req.user.role === 'admin' ? 'available' : 'pending'
        });
        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all listings
exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.findAll({
            where: { status: 'available' },
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            }]
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all listings for admin
exports.getAllListingsAdmin = async (req, res) => {
    try {
        const listings = await Listing.findAll({
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            }]
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's own listings
exports.getUserListings = async (req, res) => {
    try {
        const listings = await Listing.findAll({
            where: { owner_id: req.user.id },
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            }]
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a listing by ID
exports.getListingById = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findByPk(id, {
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            }]
        });
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
    const { title, description, category_id, price, location } = req.body;
    try {
        const listing = await Listing.findByPk(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await listing.update({ title, description, category_id, price, location });
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