const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');
const auth = require('../middleware/auth');

// Route to create a new payment
router.post('/', auth.authenticateToken, paymentsController.createPayment);

// Route to retrieve all payments
router.get('/', auth.authenticateToken, paymentsController.getAllPayments);

// Route to retrieve a specific payment by ID
router.get('/:id', auth.authenticateToken,  paymentsController.getPaymentById);

// Route to update a payment by ID
router.put('/:id', auth.authenticateToken, paymentsController.updatePayment);

// Route to delete a payment by ID
router.delete('/:id', auth.authenticateToken, paymentsController.deletePayment);

module.exports = router;