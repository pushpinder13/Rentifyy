const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// User routes
router.post('/', authenticateToken, isActiveUser, asyncHandler(bookingsController.createBooking));
router.get('/my-bookings', authenticateToken, isActiveUser, asyncHandler(bookingsController.getUserBookings));

// Admin only routes
router.get('/', authenticateToken, isAdmin, asyncHandler(bookingsController.getAllBookings));
router.get('/:id', authenticateToken, isAdmin, asyncHandler(bookingsController.getBookingById));
router.put('/:id/status', authenticateToken, isAdmin, asyncHandler(bookingsController.updateBookingStatus));
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(bookingsController.deleteBooking));

module.exports = router;