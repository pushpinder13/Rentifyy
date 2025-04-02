const { verifyToken } = require('../config/jwt');

const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' }) ;
    }
    next();
}

module.exports = { isAdmin };
