const { generateToken } = require('../config/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            phone,
            role: role || 'user' 
        });

        // Exclude password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userResponse 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Exclude password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        const token = generateToken(user.id);
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };
