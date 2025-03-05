const db = require('../config/db');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { booking_id, amount, payment_method } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Payments (booking_id, amount, payment_method) VALUES (?, ?, ?)', [booking_id, amount, payment_method]);
        res.status(201).json({ id: result.insertId, booking_id, amount, payment_method });
    } catch (error) {
        res.status(500).json({ error: 'Error creating payment' });
    }
};

// Retrieve a payment by ID
exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM Payments WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving payment' });
    }
};

// Retrieve all payments
exports.getAllPayments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Payments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving payments' });
    }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { amount, payment_method } = req.body;
    try {
        const [result] = await db.query('UPDATE Payments SET amount = ?, payment_method = ? WHERE id = ?', [amount, payment_method, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ message: 'Payment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating payment' });
    }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Payments WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
};