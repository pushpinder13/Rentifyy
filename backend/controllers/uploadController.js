const fs = require('fs');
const path = require('path');

// Handle file upload
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
            return res.status(200).json({
                status: 'success',
                message: 'File uploaded successfully',
                data: {
                    filename: req.file.filename,
                    path: `/uploads/profile-photos/${req.file.filename}`
                }
            });
        }

        // Handle multiple files upload
        if (req.files) {
            const files = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/profile-photos/${file.filename}`
            }));

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
            error: error.message
        });
    }
};

// Handle file deletion
const deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;
        const filepath = path.join(__dirname, '../uploads/profile-photos', filename);

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({
                status: 'error',
                message: 'File not found'
            });
        }

        // Delete file
        fs.unlinkSync(filepath);

        return res.status(200).json({
            status: 'success',
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting file',
            error: error.message
        });
    }
};

module.exports = {
    uploadFile,
    deleteFile
}; 