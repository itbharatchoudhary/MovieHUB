// Database.js
// This file is responsible for connecting to the MongoDB database using Mongoose.
const mongoose = require("mongoose");

// Function to connect to the MongoDB database

const ConnectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = ConnectToMongoDB;