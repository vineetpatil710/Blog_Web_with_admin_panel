const mongoose = require('mongoose');

const BackgroundColorSchema = new mongoose.Schema({
  color: {
    type: String,
    default: '#ffffff', // Provide default to avoid errors
  },
});

module.exports = mongoose.model('BackgroundColor', BackgroundColorSchema);
