const mongoose = require("mongoose");

const exchangeengineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },  
  image_url: { type: String, required: true }, 
  customer_name: { type: String, required: true },  
  model: { type: Number, required: true },
},
{ timestamps: true }  
);

const ExchangeEngine = mongoose.model("ExchangeEngine", exchangeengineSchema);

module.exports = ExchangeEngine;
