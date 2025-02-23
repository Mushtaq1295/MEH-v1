if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const port = process.env.PORT;
const db_url = process.env.ATLAS_DB_URL;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("./models/User");

const Accessory = require("./models/accessoryModel");
const Engine = require("./models/engineModel");

const accessoriesData = require("./DB/accessoriesData");
const enginesData = require("./DB/enginesData");

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  // credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(db_url);

app.get("/", (req, res) => {
  res.send("Status: OK");
});

app.get("/engines", async (req, res) => {
  const engineData = await Engine.find();
  res.json(engineData);
});

app.get("/accessories", async (req, res) => {
  const accessoryData = await Accessory.find();
  res.json(accessoryData);
});


//accessories update
app.put("/accessories/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image_url, price, available } = req.body;

  try {
    const updatedAccessory = await Accessory.findByIdAndUpdate(
      id,
      { title, image_url, price, available },
      { new: true, runValidators: true }
    );

    if (!updatedAccessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json(updatedAccessory);
  } catch (error) {
    console.error("Error updating accessory:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//engines update
app.put("/engines/:id",async(req,res) =>{
  const{id}=req.params;
  const{title,image_url,category,price,available,model,from}=req.body;
  try {
    const updatedEngine = await Engine.findByIdAndUpdate(
      id,
      { title, image_url, category, price, available, model, from },
      { new:true, runValidators:true }
      );
      if(!updatedEngine){
        return res.status(404).json({message:"Engine not found"});
      }
      res.json(updatedEngine);
  }catch(error){
    console.error("Error updataing Engine:",error);
    res.status(500).json({message:"Server error"});
  }
})

//Authentication
// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Profile (Protected)
app.get("/profile",async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
