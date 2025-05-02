// models/User.js (assumed based on your code)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }, // Store refresh token
});

module.exports = mongoose.model("User", userSchema);
