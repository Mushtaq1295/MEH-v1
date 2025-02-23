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

const port = process.env.PORT;
const db_url = process.env.ATLAS_DB_URL;
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
    res.json(updatedAccessory);
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
    res.json(updatedEngine);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/accessories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, phone_number, available, pay_mode, price } =
      req.body;
    if (!customer_name || !phone_number || !available || !pay_mode || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updateAccessory = await Accessory.findByIdAndUpdate(
      id,
      {
        $inc: { available: -available },
      },
      { new: true }
    );

    console.log(updateAccessory);

    if (!updateAccessory) {
      return res.status(404).json({
        success: false,
        message: "Accessory not found",
      });
    }

    await new CheckoutAccessory({
      accessory_id: req.params.id,
      ...req.body,
    }).save();
    res
      .status(201)
      .json({
        success: true,
        accessory: updateAccessory,
        message: "Checkout successful",
      });
  } catch (error) {
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
      expiresIn: "1h",
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
