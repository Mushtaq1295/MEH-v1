const mongoose = require("mongoose");

const exchangeaccessorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true }, //change this cuz it is an image uploaded by user
  customer_name: { type: String, required: true },  // may take ref from checkoutAccessoryModel
},
{ timestamps: true }  //this is from checkoutAccessoryModel take ref
);

const ExchangeAccessory = mongoose.model("ExchangeAccessory", exchangeaccessorySchema);

module.exports = ExchangeAccessory;
