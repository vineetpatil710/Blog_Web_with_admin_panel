// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminPanelDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
