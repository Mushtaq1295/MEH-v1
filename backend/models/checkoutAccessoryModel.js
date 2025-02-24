const mongoose = require("mongoose");

const checkoutAccessorySchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    available: { type: Number, required: true }, // Quantity
    pay_mode: {
      type: String,
      enum: ["Cash", "Google Pay", "Phone Pay", "Others"],
      required: true,
    },
    price: { type: Number, required: true },
    accessory: { type: mongoose.Schema.Types.ObjectId, ref: "Accessory", required: true }, // Reference to Accessory
  },
  { timestamps: true }
);

const CheckoutAccessory = mongoose.model("CheckoutAccessory", checkoutAccessorySchema);
module.exports = CheckoutAccessory;
