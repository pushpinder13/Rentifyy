const { User } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Create user (admin only)
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'renter',
            is_active: true
        });

        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                is_active: user.is_active
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'phone', 'role', 'created_at'] });
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
        const users = await User.findAll({ 
            attributes: ['id', 'name', 'email', 'phone', 'role', 'is_active', 'created_at', 'updated_at'],
            order: [['created_at', 'DESC']]
        });

        console.log('Found users:', users.length);
        console.log('Users data:', users.map(u => ({ id: u.id, email: u.email, role: u.role })));

        res.status(200).json({ 
            message: 'Users retrieved successfully',
            users 
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get pending admin requests (listings awaiting approval)
const getPendingRequests = async (req, res) => {
    try {
        const { Listing } = require('../models');
        const pendingListings = await Listing.findAll({
            where: {
                status: 'inactive' // Pending approval listings
            },
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email', 'phone']
            }],
            attributes: ['id', 'title', 'description', 'price', 'location', 'created_at'],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            message: 'Pending listings retrieved successfully',
            requests: pendingListings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve listing (admin only)
const approveListing = async (req, res) => {
    try {
        const { Listing } = require('../models');
        const listingId = req.params.id;
        const listing = await Listing.findByPk(listingId);
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await listing.update({ status: 'available' });
        res.status(200).json({ message: 'Listing approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rejectListing = async (req, res) => {
    try {
        const { Listing } = require('../models');
        const listingId = req.params.id;
        const listing = await Listing.findByPk(listingId);
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await listing.update({ status: 'rejected' });
        res.status(200).json({ message: 'Listing rejected successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { 
            attributes: ['id', 'name', 'email', 'phone', 'role', 'is_active', 'created_at'] 
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
    createUser,
    getProfile,
    updateProfile,
    getAllUsers,
    getPendingRequests,
    approveListing,
    rejectListing,
    getUserById,
    updateUser,
    deleteUser
};