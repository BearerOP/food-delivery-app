const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log('Database connection failed!');
    }
  } catch (err) {
    console.log(`MongoDB Connection Error: ${err.message}`);
  }
};

module.exports = { connectDB };
