const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  tagline: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Banner', BannerSchema);