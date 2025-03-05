const { generateToken } = require('../config/jwt');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, phone } = req.body ;
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]) ;
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' }) ;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, phone]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}       

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user[0].id);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login };
