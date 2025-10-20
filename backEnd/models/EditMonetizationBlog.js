const mongoose = require('mongoose');

const EditMonetizationSchema = new mongoose.Schema({
  EditMonetizationBlog: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('EditMonetization', EditMonetizationSchema);
