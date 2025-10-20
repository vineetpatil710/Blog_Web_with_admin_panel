const mongoose = require('mongoose');

const BlogCategories = new mongoose.Schema({
    category: {
    type: String,
    enum: ['Community', 'Company', 'Culture', 'Technology'],
     required: true,
  },
  title: {
    type: String,
    required: true,
       unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  date:{
     type: String,
      required: true,
  },
  readTime:{
     type: String,
      required: true,
  },
    posts: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('BlogCategories', BlogCategories);





