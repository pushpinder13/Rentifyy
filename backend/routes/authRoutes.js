const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { asyncHandler } = require('../middleware/errorHandler');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profile_photo'), asyncHandler(register));

// Login
router.post('/login', asyncHandler(login));

module.exports = router;
