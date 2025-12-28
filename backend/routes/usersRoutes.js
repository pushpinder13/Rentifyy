const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// User profile routes (authenticated users only)
router.get('/profile', authenticateToken, isActiveUser, asyncHandler(usersController.getProfile));
router.put('/profile', authenticateToken, isActiveUser, asyncHandler(usersController.updateProfile));

// Admin only routes
router.post('/', authenticateToken, isAdmin, asyncHandler(usersController.createUser));
router.get('/', authenticateToken, isAdmin, asyncHandler(usersController.getAllUsers));
router.get('/pending-requests', authenticateToken, isAdmin, asyncHandler(usersController.getPendingRequests));
router.put('/approve-listing/:id', authenticateToken, isAdmin, asyncHandler(usersController.approveListing));
router.put('/reject-listing/:id', authenticateToken, isAdmin, asyncHandler(usersController.rejectListing));
router.get('/:id', authenticateToken, isAdmin, asyncHandler(usersController.getUserById));
router.put('/:id', authenticateToken, isAdmin, asyncHandler(usersController.updateUser));
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(usersController.deleteUser));

module.exports = router;