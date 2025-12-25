const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { listing_id, renter_id, start_date, end_date } = req.body;
    try {
        const booking = await Booking.create({ listing_id, renter_id, start_date, end_date });
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a booking
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { listing_id, renter_id, start_date, end_date } = req.body;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.update({ listing_id, renter_id, start_date, end_date });
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.destroy();
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};