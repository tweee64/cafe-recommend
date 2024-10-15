const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://twee:test123@cluster0.8o4hr.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;
