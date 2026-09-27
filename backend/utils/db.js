const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.warn('⚠️  MongoDB Connection Warning:', err.message);
    console.warn('   The portfolio will continue running with offline mode for messages.');
  }
};

module.exports = connectDB;