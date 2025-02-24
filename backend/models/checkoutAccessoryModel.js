const mongoose = require("mongoose");

const checkoutAccessorySchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    available: { type: Number, required: true }, //quantity
    pay_mode: {
      type: String,
      enum: ["Cash", "Google Pay", "Phone Pay", "Others"],
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const CheckoutAccessory = mongoose.model(
  "CheckoutAccessory",
  checkoutAccessorySchema
);
module.exports = CheckoutAccessory;
