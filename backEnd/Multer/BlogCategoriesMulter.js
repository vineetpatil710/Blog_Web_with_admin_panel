
const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

// ensure the /uploads dir exists once (mkdir -p uploads)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/BlogCategories/'),
  filename: (_req, file, cb) =>
    cb(null, `${uuid()}${path.extname(file.originalname)}`)
});



const BlogCategories = multer({ storage: storage });

module.exports = BlogCategories;
