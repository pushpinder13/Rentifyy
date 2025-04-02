const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadFile, deleteFile } = require('../controllers/uploadController');
const { authenticateToken } = require('../middleware/auth');

// Upload a single file
router.post('/single', authenticateToken, upload.single('file'), uploadFile);

// Upload multiple files
router.post('/multiple', authenticateToken, upload.array('files', 5), uploadFile);

// Delete a file
router.delete('/:filename', authenticateToken, deleteFile);

module.exports = router; 