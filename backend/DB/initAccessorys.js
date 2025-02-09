const mongoose = require("mongoose");
const { accessoriesData } = require("./accessoriesData");
const Accessory = require("../models/accessoryModel");
const connectDB = require("../config/db");

require("dotenv").config({ path: "../.env" }); // Load environment variables

const db_url = process.env.ATLAS_DB_URL;

const seedAccessories = async () => {
  try {
    await connectDB(db_url);
    await Accessory.deleteMany(); // Delete existing data
    console.log("🗑️ Accessories data deleted.");

    console.log("🔍 First Accessory Data:", accessoriesData[0]);

    // ✅ Ensure it's an array before inserting
    if (!Array.isArray(accessoriesData)) {
      throw new Error("accessoriesData is not an array!");
    }

    // ✅ Try inserting one by one for debugging
    for (const item of accessoriesData) {
      try {
        await Accessory.create(item);  // Insert each item separately
        console.log(`✅ Inserted: ${item.title}`);
      } catch (err) {
        console.error(`❌ Failed to insert ${item.title}:`, err.message);
      }
    }

    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
};



// Run the function
seedAccessories();
