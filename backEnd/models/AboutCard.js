const mongoose = require('mongoose');

const AboutCardSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('AboutCard', AboutCardSchema);
