const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { authenticateToken, isActiveUser } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Create category (admin only)
router.post('/', authenticateToken, isAdmin, asyncHandler(categoriesController.createCategory));

// Get all categories (public)
router.get('/', asyncHandler(categoriesController.getAllCategories));

// Get specific category (public)
router.get('/:id', asyncHandler(categoriesController.getCategoryById));

// Update category (admin only)
router.put('/:id', authenticateToken, isAdmin, asyncHandler(categoriesController.updateCategory));

// Delete category (admin only)
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(categoriesController.deleteCategory));

module.exports = router;