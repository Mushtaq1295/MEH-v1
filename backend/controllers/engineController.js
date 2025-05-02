const Engine = require("../models/Engine");
const CheckoutEngine = require("../models/CheckoutEngine");
const mongoose = require("mongoose");

class EngineController {
  // Get all engines
  async getAllEngines(req, res) {
    try {
      const engines = await Engine.find();
      res.json(engines);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Update an engine
  async updateEngine(req, res) {
    try {
      const engine = await Engine.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!engine) {
        return res.status(404).json({ message: "Engine not found" });
      }

      res.status(200).json({
        success: true,
        message: "Engine updated successfully",
        engine,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Checkout an engine
  async checkoutEngine(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const {
        title,
        image_url_main,
        customer_name,
        phone_number,
        available,
        exchange,
        category,
        engine_brand,
        image_url,
        model,
        item_name,
        pay_mode,
        price,
      } = req.body;

      if (
        !title ||
        !image_url_main ||
        !customer_name ||
        !phone_number ||
        !available ||
        !pay_mode ||
        !price
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All required fields missing" });
      }

      const engine = await Engine.findById(id).session(session);
      if (!engine) {
        return res
          .status(404)
          .json({ success: false, message: "Engine not found" });
      }

      if (engine.available < available) {
        return res.status(400).json({
          success: false,
          message: `Insufficient Stock. Only ${engine.available} left`,
        });
      }

      const updatedEngine = await Engine.findByIdAndUpdate(
        id,
        { $inc: { available: -available } },
        { new: true, session }
      );

      const checkout = new CheckoutEngine({
        title,
        image_url_main,
        customer_name,
        phone_number,
        available,
        exchange,
        category,
        engine_brand,
        image_url,
        model,
        item_name,
        pay_mode,
        price,
      });

      await checkout.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        engine: updatedEngine,
        message: "Engine checkout successful",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Engine checkout failed:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  // Get checkout history
  async getEngineHistory(req, res) {
    try {
      const history = await CheckoutEngine.find();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  // Delete engine checkout history by ID
  async deleteEngineHistory(req, res) {
    try {
      const id = req.params.id;
      const deleted = await CheckoutEngine.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Engine checkout not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Engine checkout deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new EngineController();
