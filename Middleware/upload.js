const multer = require('multer');

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,

    // Maximum file size: 5MB
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    // Only allow image files
    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    'Only JPG, JPEG, PNG, GIF and WEBP images are allowed'
                )
            );
        }
    }
});

module.exports = upload;