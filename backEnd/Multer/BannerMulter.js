// config/multerConfig.js

const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

// Ensure the 'uploads/TrendingBlogsimage' directory exists (create it manually or handle it in code)
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/Banner/');
  },
  filename: function (_req, file, cb) {
    const uniqueName = `${uuid()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const Banner = multer({ storage: storage });

module.exports = Banner;
