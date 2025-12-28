const { generateToken } = require('../config/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, phone, role, adminCode } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                status: 'error',
                message: 'User already exists',
                error: 'USER_EXISTS'
            });
        }

        // Validate admin code for admin role
        if (role === 'admin' && adminCode !== '1000') {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid admin code',
                error: 'INVALID_ADMIN_CODE'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'renter'
        };

        if (req.file) {
            userData.profile_photo = `/uploads/profile-photos/${req.file.filename}`;
        }

        const user = await User.create(userData);
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: userResponse
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials',
                error: 'INVALID_CREDENTIALS'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials',
                error: 'INVALID_CREDENTIALS'
            });
        }

        const userResponse = user.toJSON();
        delete userResponse.password;

        const token = generateToken(user.id);
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error',
            error: 'SERVER_ERROR'
        });
    }
};

module.exports = { register, login };
