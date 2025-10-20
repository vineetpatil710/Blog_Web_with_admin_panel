const mongoose = require('mongoose');

const AboutTextSchema = new mongoose.Schema({
  title: String,
  author: String,
  posts: String,
});

module.exports = mongoose.model('AboutText', AboutTextSchema);
