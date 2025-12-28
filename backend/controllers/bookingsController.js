const { Booking, User, Listing } = require('../models');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { listing_id, start_date, end_date } = req.body;
    try {
        // Check if listing exists and is available
        const listing = await Listing.findByPk(listing_id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        if (listing.status !== 'available') {
            return res.status(400).json({ message: 'Listing is not available for booking' });
        }

        const booking = await Booking.create({
            listing_id,
            renter_id: req.user.id,
            start_date,
            end_date,
            status: 'pending'
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { renter_id: req.user.id },
            include: [
                {
                    model: Listing,
                    as: 'listing',
                    attributes: ['id', 'title', 'location', 'price']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({
            message: 'User bookings retrieved successfully',
            bookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: User,
                    as: 'renter',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Listing,
                    as: 'listing',
                    attributes: ['id', 'title', 'location']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ 
            message: 'Bookings retrieved successfully',
            bookings 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'renter',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Listing,
                    as: 'listing',
                    attributes: ['id', 'title', 'location']
                }
            ]
        });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json({ 
            message: 'Booking retrieved successfully',
            booking 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByPk(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        await booking.update({ status });
        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        await booking.destroy();
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};