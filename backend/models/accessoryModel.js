const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
