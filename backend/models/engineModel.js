const mongoose = require("mongoose");

const engineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true }, // ✅ Ensure image field exists
  category: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
  model: { type: Number, required: true },
  from: { type: String },
});

const Engine = mongoose.model("Engine", engineSchema);
module.exports = Engine;
