const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

// MongoDB Connection String
const db_url =
  process.env.ATLAS_DB_URL ||
  "mongodb+srv://mehuser:mehpass123@cluster0.qc0tysj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // "mongodb+srv://thesaiteja24:thesaiteja24@cluster0.j9kft.mongodb.net/MEH?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Function to export all collections
const exportCollections = async () => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (collections.length === 0) {
      console.log("⚠️ No collections found in the database.");
      return;
    }

    for (const collection of collections) {
      const collectionName = collection.name;
      const Model = mongoose.connection.db.collection(collectionName);
      const data = await Model.find().toArray(); // Fetch all documents

      // Write to JSON file
      const fileName = `${collectionName}.json`;
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
      console.log(`✅ Data from '${collectionName}' exported to ${fileName}`);
    }
  } catch (error) {
    console.error("❌ Error fetching collections:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  }
};

// Run script
const run = async () => {
  await connectDB();
  await exportCollections();
};

run();
