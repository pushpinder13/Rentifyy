const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'phone', 'created_At'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const userId = req.user.id;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

       
        const existingUser = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        let updateData = { name, email, phone };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update(updateData);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
       
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const users = await User.findAll({ 
            attributes: ['id', 'name', 'email', 'phone', 'role', 'is_active', 'created_At'],
            order: [['created_At', 'DESC']]
        });

        res.status(200).json({ 
            message: 'Users retrieved successfully',
            users 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const user = await User.findByPk(req.params.id, { 
            attributes: ['id', 'name', 'email', 'phone', 'role', 'is_active', 'created_At'] 
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ 
            message: 'User retrieved successfully',
            user 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user (admin only)
const updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const { name, email, password, phone, role, is_active } = req.body;
        const userId = req.params.id;
   
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        let updateData = { name, email, phone, role, is_active };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update(updateData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};