const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin, isAdminOrOwner } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Create booking
router.post('/', authenticateToken, isActiveUser, asyncHandler(bookingsController.createBooking));

// Get all bookings (admin only)
router.get('/', authenticateToken, isAdmin, asyncHandler(bookingsController.getAllBookings));

// Get specific booking
router.get('/:id', authenticateToken, isAdminOrOwner, asyncHandler(bookingsController.getBookingById));

// Update booking
router.put('/:id', authenticateToken, isAdminOrOwner, asyncHandler(bookingsController.updateBooking));

// Delete booking
router.delete('/:id', authenticateToken, isAdminOrOwner, asyncHandler(bookingsController.deleteBooking));

module.exports = router;