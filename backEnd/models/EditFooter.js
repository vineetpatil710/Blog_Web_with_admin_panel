const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  text1: String,
  text2: String,
  text3: String,
  color: String
});

module.exports = mongoose.model('Footer', FooterSchema);
