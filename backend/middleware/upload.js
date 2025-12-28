const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.resolve(__dirname, '../uploads/profile-photos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for local file system with security
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Sanitize original filename
        const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(sanitizedName);
        cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

// Create multer upload instance with enhanced security
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // Maximum 10 files
    },
    fileFilter: function (req, file, cb) {
        // Accept images only with strict validation
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];
        
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (!allowedMimes.includes(file.mimetype) || !allowedExts.includes(ext)) {
            return cb(new Error('Only image files (JPG, JPEG, PNG, GIF) are allowed!'), false);
        }
        
        // Additional security: check file size
        if (file.size > 5 * 1024 * 1024) {
            return cb(new Error('File size too large!'), false);
        }
        
        cb(null, true);
    }
});

module.exports = upload; 