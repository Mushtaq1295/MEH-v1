const mongoose = require("mongoose");

const checkoutEngineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    customer_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    available: { type: Number, required: true }, //quantity
    exchange: { type: Boolean, required: true }, // true -> Yes, false -> No
    category: {
      type: String,
      enum: ["Engines", "Accessories"],
      required: function () {
        return this.exchange;
      },
    },

    // Fields required only if category is "Accessories"
    item_name: {
      type: String,
      required: function () {
        return !this.exchange && this.category === "Accessories";
      },
    },

    // Fields required only if category is "Engines"
    engine_brand: {
      type: String,
      enum: ["ASHOK LEYLAND HINO","ASHOK LEYLAND", "TATA CUMMINS","TATA TCIC", "BHARAT BENZ","MAHINDRA", "EICHER","MAN"],
      required: function () {
        return !this.exchange && this.category === "Engines";
      },
    },
    image_url_main: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: function () {
        return !this.exchange && this.category === "Engines";
      },
    },
    model: {
      type: Number,
      required: function () {
        return !this.exchange && this.category === "Engines";
      },
    },

    // Common fields for all categories
    pay_mode: {
      type: String,
      enum: ["Cash", "Google Pay", "Phone Pay", "Others"],
      required: true,
    },
    price: { type: Number, required: true },
    // engine: {type: mongoose.Schema.Types.ObjectId, ref:"Engine",required:true},
  },
  { timestamps: true }
);

const CheckoutEngine = mongoose.model("CheckoutEngine", checkoutEngineSchema);
module.exports = CheckoutEngine;
