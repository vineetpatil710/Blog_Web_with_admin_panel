
const multer = require('multer');
const path = require('path');


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/Logo/'),
  filename: (req, file, cb) => cb(null, 'logo_' + Date.now() + path.extname(file.originalname)),
});


const EditLogo = multer({ storage: storage });

module.exports = EditLogo;
