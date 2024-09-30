  const multer = require('multer');

  // Set up multer to use memory storage
  const storage = multer.memoryStorage();

  // Configure multer to handle file uploads
  const upload = multer({
    storage: storage, // Store files in memory
    limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept image files only
      } else {
        cb(new Error('Only image files are allowed!'), false); // Reject non-image files
      }
    },
  });

  module.exports = upload;
