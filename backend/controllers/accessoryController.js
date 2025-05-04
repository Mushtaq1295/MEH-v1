const Accessory = require("../models/Accessory");
const CheckoutAccessory = require("../models/CheckoutAccessory");
const mongoose = require("mongoose");

class AccessoryContorller {
  // Get all accessories
  async getAllAccessories(req, res) {
    try {
      const accessories = await Accessory.find();
      res.json(accessories);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Update an accessory
  async updateAccessory(req, res) {
    try {
      const accessory = await Accessory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!accessory) {
        return res.status(404).json({ message: "Accessory not found" });
      }

      res.status(200).json({
        success: true,
        message: "Accessory updated successfully",
        updatedAccessory:accessory,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Checkout an accessory
  async checkoutAccessory(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const {
        title,
        image_url,
        customer_name,
        phone_number,
        available,
        pay_mode,
        price,
      } = req.body;

      if (
        !title ||
        !image_url ||
        !customer_name ||
        !phone_number ||
        !available ||
        !pay_mode ||
        !price
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const accessory = await Accessory.findById(id).session(session);
      if (!accessory) {
        return res
          .status(404)
          .json({ success: false, message: "Accessory not found" });
      }

      if (accessory.available < available) {
        return res.status(400).json({
          success: false,
          message: `Insufficient Stock. Only ${accessory.available} left`,
        });
      }

      const updatedAccessory = await Accessory.findByIdAndUpdate(
        id,
        { $inc: { available: -available } },
        { new: true, session }
      );

      const checkout = new CheckoutAccessory({
        title,
        image_url,
        customer_name,
        phone_number,
        available,
        pay_mode,
        price,
      });

      await checkout.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        accessory: updatedAccessory,
        message: "Accessory checkout successful",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Checkout failed:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  // Get checkout history
  async getAccessoryHistory(req, res) {
    try {
      const history = await CheckoutAccessory.find();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Delete accessory checkout history by ID
  async deleteAccessoryHistory(req, res) {
    try {
      const id = req.params.id;
      const deleted = await CheckoutAccessory.findByIdAndDelete(id);

      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Accessory checkout not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Accessory checkout deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new AccessoryContorller();
