const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { booking_id, amount, payment_method } = req.body;
    try {
        const payment = await Payment.create({ booking_id, amount, payment_method });
        res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { amount, payment_method } = req.body;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.update({ amount, payment_method });
        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.destroy();
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};