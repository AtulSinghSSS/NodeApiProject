const { log } = require('console');
const multer = require('multer');
const path = require('path');

// Define storage strategy
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save uploaded files
  },
  filename: function (req, file, cb) {
    // Use timestamp + original name to avoid duplicates
    cb(null, Date.now() + path.extname(file.originalname));
    console.log(`File uploaded: ${file.originalname} at ${new Date().toISOString()}`);
  }
});

// File filter (optional) to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  const mimetype = allowedTypes.test(file.mimetype);
console.log(`File type: ${file.mimetype}, Extension: ${extname}`);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};
debugger;
const upload = multer({ storage, fileFilter });

module.exports = upload;
