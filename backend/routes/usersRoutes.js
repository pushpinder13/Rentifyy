const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Protected routes (require authentication)
router.get('/profile', usersController.getProfile);
router.put('/profile', usersController.updateProfile);

// Admin only routes
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;