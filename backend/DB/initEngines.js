const mongoose = require("mongoose");
const { sampleEngines } = require("./enginesData");
const Engine = require("../models/engineModel");
const connectDB = require("../config/db");

require("dotenv").config({ path: "../.env" }); // Load environment variables

const db_url = process.env.ATLAS_DB_URL;

const seedDatabase = async () => {
  try {
    await connectDB(db_url); // Connect to MongoDB

    await Engine.deleteMany(); // Clear existing data
    console.log("🗑️ Existing data deleted.");

    await Engine.insertMany(sampleEngines); // Insert new data
    console.log("✅ Data inserted successfully!");

    mongoose.connection.close(); // Close the connection
    console.log("🔌 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error inserting data:", error.message);
    process.exit(1);
  }
};

// Run the function
seedDatabase();
