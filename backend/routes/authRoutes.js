const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { asyncHandler } = require('../middleware/errorHandler');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profile_photo'), validateRegistration, asyncHandler(register));

// Login
router.post('/login', validateLogin, asyncHandler(login));

module.exports = router;
