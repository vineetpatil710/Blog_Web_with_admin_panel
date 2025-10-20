const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
  color: { type: String, required: true },
});

module.exports = mongoose.model('HeaderColor', LogoSchema);
