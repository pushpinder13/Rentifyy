const db = require('../config/db');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { listing_id, renter_id, start_date, end_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Bookings (listing_id, renter_id, start_date, end_date) VALUES (?, ?, ?, ?)', [listing_id, renter_id, start_date, end_date]);
        res.status(201).json({ id: result.insertId, listing_id, renter_id, start_date, end_date });
    } catch (error) {
        res.status(500).json({ error: 'Error creating booking' });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const [bookings] = await db.query('SELECT * FROM Bookings');
        if(bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving bookings' });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const [booking] = await db.query('SELECT * FROM Bookings WHERE id = ?', [id]);
        if (booking.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving booking' });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const { listing_id, renter_id, start_date, end_date } = req.body;
    try {
        const [result] = await db.query('UPDATE Bookings SET listing_id = ?, renter_id = ?, start_date = ?, end_date = ? WHERE id = ?', [listing_id, renter_id, start_date, end_date, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating booking' });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Bookings WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting booking' });
    }
};