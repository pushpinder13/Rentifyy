const db = require('../config/db');

// Get user profile
const getProfile = async (req, res) => {
    try {
        const [user] = await db.query(
            'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, password,phone } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Check if email is already taken by another user
        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE email = ? AND id != ?',
            [email, userId]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        let updateQuery = 'UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?';
        let queryParams = [name, email, password, phone, userId];

        // If password is provided, include it in update
        if (password) {
            updateQuery = 'UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?';
            queryParams = [name, email, password, phone, userId];
        }

        const [result] = await db.query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, phone, created_at FROM users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        const [user] = await db.query(
            'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
            [req.params.id]
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update user (admin only)
const updateUser = async (req, res) => {
    try {
        const { name, email, password, age, phone } = req.body;
        const userId = req.params.id;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        let updateQuery = 'UPDATE users SET name = ?, email = ?, password = ?, age = ?, phone = ? WHERE id = ?';
        let queryParams = [name, email, password, age, phone, userId];

        // If password is provided, include it in update
        if (password) {
            updateQuery = 'UPDATE users SET name = ?, email = ?, password = ?, age = ?, phone = ? WHERE id = ?';
            queryParams = [name, email, password, age, phone, userId];
        }

        const [result] = await db.query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add user
// const addUser = async (req, res) => {
//     try {
//         const { name, email, password, phone } = req.body;
//         const [result] = await db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, password, phone]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(201).json({ message: 'User added successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};