const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin, isAdminOrOwner } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Create payment
router.post('/', authenticateToken, isActiveUser, asyncHandler(paymentsController.createPayment));

// Get all payments (admin only)
router.get('/', authenticateToken, isAdmin, asyncHandler(paymentsController.getAllPayments));

// Get specific payment
router.get('/:id', authenticateToken, isAdminOrOwner, asyncHandler(paymentsController.getPaymentById));

// Update payment
router.put('/:id', authenticateToken, isAdminOrOwner, asyncHandler(paymentsController.updatePayment));

// Delete payment
router.delete('/:id', authenticateToken, isAdminOrOwner, asyncHandler(paymentsController.deletePayment));

module.exports = router;