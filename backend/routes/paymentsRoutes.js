const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

// Route to create a new payment
router.post('/', paymentsController.createPayment);

// Route to retrieve all payments
router.get('/', paymentsController.getAllPayments);

// Route to retrieve a specific payment by ID
router.get('/:id', paymentsController.getPaymentById);

// Route to update a payment by ID
router.put('/:id', paymentsController.updatePayment);

// Route to delete a payment by ID
router.delete('/:id', paymentsController.deletePayment);

module.exports = router;