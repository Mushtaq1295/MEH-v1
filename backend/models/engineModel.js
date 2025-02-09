const mongoose = require("mongoose");

const engineSchema = new mongoose.Schema({
  title: String,
  category: String,
  EngineName: String,
  price: Number,
  available: Number,
  model: Number,
  from: String,
});

const Engine = mongoose.model("Engine", engineSchema);

module.exports = Engine;
