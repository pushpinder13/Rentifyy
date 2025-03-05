const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
// const auth = require('../middleware/auth');                  

// Create a new booking
router.post('/', bookingsController.createBooking);

// Get all bookings
router.get('/', bookingsController.getAllBookings);

// Get a specific booking by ID             
router.get('/:id', bookingsController.getBookingById);

// Update a booking by ID
router.put('/:id', bookingsController.updateBooking);

// Delete a booking by ID
router.delete('/:id', bookingsController.deleteBooking);

module.exports = router;