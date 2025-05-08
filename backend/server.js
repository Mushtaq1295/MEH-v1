if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const isProd = process.env.NODE_ENV === "prod";
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const accessoryRoutes = require("./routes/accessoryRoutes");
const engineRoutes = require("./routes/engineRoutes");
const User = require("./models/User");
const allowedOrigins = [process.env.CLIENT_URL];


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
connectDB(process.env.ATLAS_DB_URL);

// Routes
app.get("/", (req, res) => res.send("Status: OK"));
app.use("/accessories", accessoryRoutes);
app.use("/engines", engineRoutes);

// Authentication Routes
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Issue access token (15 minutes)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Issue refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in user document
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: "Login successful",
      user: { _id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.post("/api/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(
      "Refresh token received:",
      refreshToken ? "Present" : "Missing"
    );
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("Refresh token decoded:", decoded);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      console.log("Refresh token invalid or mismatched for user:", decoded.id);
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token" });
    }

    // Issue new access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set new access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({
      success: true,
      message: "Token refreshed successfully",
      user: { _id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token expired" });
    }
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
});

app.post("/api/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(decoded.id);
        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      } catch (error) {
        console.log("Error verifying refresh token during logout:", error);
      }
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Profile error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(process.env.NODE_ENV);
});
