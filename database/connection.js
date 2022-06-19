const mongoose = require('mongoose');
const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb+srv://admin:admin123@cluster0.wjclw.mongodb.net/test',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  );
  console.log(`You are connected:${conn.connection.host}`);
};

module.exports = connectDB;
