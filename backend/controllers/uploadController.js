const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Handle file upload with enhanced security
const uploadFile = async (req, res) => {
    try {
        if (!req.file && !req.files) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        // Handle single file upload
        if (req.file) {
            // Double sanitization for security
            const sanitizedFilename = path.basename(req.file.filename).replace(/[^a-zA-Z0-9._-]/g, '_');
            const safePath = `/uploads/profile-photos/${sanitizedFilename}`;
            
            return res.status(200).json({
                status: 'success',
                message: 'File uploaded successfully',
                data: {
                    filename: sanitizedFilename,
                    path: safePath
                }
            });
        }

        // Handle multiple files upload
        if (req.files) {
            const files = req.files.map(file => {
                const sanitizedFilename = path.basename(file.filename).replace(/[^a-zA-Z0-9._-]/g, '_');
                return {
                    filename: sanitizedFilename,
                    path: `/uploads/profile-photos/${sanitizedFilename}`
                };
            });

            return res.status(200).json({
                status: 'success',
                message: 'Files uploaded successfully',
                data: files
            });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error uploading file(s)',
            error: 'UPLOAD_ERROR'
        });
    }
};

// Handle file deletion with maximum security
const deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;
        
        // Multiple layers of security validation
        if (!filename || typeof filename !== 'string') {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid filename'
            });
        }
        
        // Sanitize filename - only allow safe characters
        const sanitizedFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
        
        // Additional validation - check format
        if (!/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif)$/i.test(sanitizedFilename)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid filename format'
            });
        }
        
        // Construct safe path
        const uploadsDir = path.resolve(__dirname, '../uploads/profile-photos');
        const safePath = path.resolve(uploadsDir, sanitizedFilename);
        
        // Critical security check - ensure path is within uploads directory
        if (!safePath.startsWith(uploadsDir + path.sep) && safePath !== uploadsDir) {
            return res.status(400).json({
                status: 'error',
                message: 'Access denied'
            });
        }

        // Check if file exists
        if (!fs.existsSync(safePath)) {
            return res.status(404).json({
                status: 'error',
                message: 'File not found'
            });
        }

        // Delete file
        fs.unlinkSync(safePath);

        return res.status(200).json({
            status: 'success',
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting file',
            error: 'DELETE_ERROR'
        });
    }
};

module.exports = {
    uploadFile,
    deleteFile
}; 