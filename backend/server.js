if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");

const User = require("./models/User");
const Accessory = require("./models/accessoryModel");
const Engine = require("./models/engineModel");
const CheckoutAccessory = require("./models/checkoutAccessoryModel");
const CheckoutEngine = require("./models/checkoutEngineModel");
const mongoose = require("mongoose");

const port = process.env.PORT;
const db_url = process.env.ATLAS_DB_URL;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB(db_url);

// Routes
app.get("/", (req, res) => res.send("Status: OK"));

app.get("/engines", async (req, res) => res.json(await Engine.find()));
app.get("/accessories", async (req, res) => res.json(await Accessory.find()));

app.put("/accessories/:id", async (req, res) => {
  try {
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAccessory)
      return res.status(404).json({ message: "Accessory not found" });
    res.status(200).json({
      success: "true",
      message: "Accessory data updated successfully",
      updatedAccessory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/engines/:id", async (req, res) => {
  try {
    const updatedEngine = await Engine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEngine)
      return res.status(404).json({ message: "Engine not found" });
    res.status(200).json({
      success: "true",
      message: "Engine data updated successfully",
      updatedEngine,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/accessories/:id", async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start a transaction

  try {
    const { id } = req.params;
    const {
      title,
      image_url,
      customer_name,
      phone_number,
      available,
      pay_mode,
      price,
    } = req.body;

    // Validate input
    if (
      !title ||
      !image_url ||
      !customer_name ||
      !phone_number ||
      !available ||
      !pay_mode ||
      !price
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the accessory
    const accessory = await Accessory.findById(id).session(session);
    if (!accessory) {
      return res
        .status(404)
        .json({ success: false, message: "Accessory not found" });
    }

    // Check stock availability
    if (accessory.available < available) {
      return res.status(400).json({
        success: false,
        message: `Insufficient Stock. Only ${accessory.available} left`,
      });
    }

    // Reduce the available stock (but within the transaction)
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      id,
      { $inc: { available: -available } },
      { new: true, session }
    );

    // Create checkout entry (if this fails, the transaction will roll back)
    const checkout = new CheckoutAccessory({
      title,
      image_url,
      accessory_id: id,
      customer_name,
      phone_number,
      available,
      pay_mode,
      price,
    });

    await checkout.save({ session });

    // ✅ Commit transaction (both stock update & checkout success)
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      accessory: updatedAccessory,
      message: "Accessory Checkout successful",
    });
  } catch (error) {
    await session.abortTransaction(); // ❌ Rollback transaction on error
    session.endSession();

    console.log("Checkout failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/engines/:id", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const {
      customer_name,
      phone_number,
      available, // quantity to checkout
      exchange,
      category,
      engine_brand,
      image_url,
      model,
      item_name, // only required if category is "Accessories"
      pay_mode,
      price,
    } = req.body;

    // Validate required fields
    if (!customer_name || !phone_number || !available || !pay_mode || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the engine inside the transaction
    const engine = await Engine.findById(id).session(session);
    if (!engine) {
      return res
        .status(404)
        .json({ success: false, message: "Engine not found" });
    }

    // Check stock availability
    if (engine.available < available) {
      return res.status(400).json({
        success: false,
        message: `Insufficient Stock. Only ${engine.available} left`,
      });
    }

    // Reduce the available stock (but within the transaction)
    const updatedEngine = await Engine.findByIdAndUpdate(
      id,
      { $inc: { available: -available } },
      { new: true, session }
    );

    // Create checkout entry (if this fails, the transaction will roll back)
    const checkout = new CheckoutEngine({
      customer_name,
      phone_number,
      available,
      exchange,
      category,
      engine_brand,
      image_url,
      model,
      item_name,
      pay_mode,
      price,
      engine_id: id,
    });

    await checkout.save({ session });

    // ✅ Commit transaction (both stock update & checkout success)
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      engine: updatedEngine,
      message: "Engine checkout successful",
    });
  } catch (error) {
    await session.abortTransaction(); // ❌ Rollback transaction on error
    session.endSession();

    console.error("Checkout failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/history/accessories", async (req, res) =>
  res.json(await CheckoutAccessory.find())
);

app.get("/history/engines", async (req, res) =>
  res.json(await CheckoutEngine.find())
);

// Delete Engine by ID
app.delete("/history/engines/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEngine = await CheckoutEngine.findByIdAndDelete(id);
    if (!deletedEngine) {
      return res
        .status(404)
        .json({ success: false, message: "Engine not found" });
    }
    res.status(200).json({ success: true, message: "Engine deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete Accessory by ID
app.delete("/history/accessories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAccessory = await CheckoutAccessory.findByIdAndDelete(id);
    if (!deletedAccessory) {
      return res
        .status(404)
        .json({ success: false, message: "Accessory not found" });
    }
    res.status(200).json({ success: true, message: "Accessory deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    req.user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Authentication Routes
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });
    if (await User.findOne({ email }))
      return res.status(400).json({ error: "Email already in use" });
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    await new User({ email, password: hashedPassword }).save();
    res.status(201).json({ message: "✅ User registered successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({
      message: "Login successful",
      token,
      user: { _id: user._id, email: user.email },
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    res.json(await User.findById(req.user.id).select("-password"));
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
