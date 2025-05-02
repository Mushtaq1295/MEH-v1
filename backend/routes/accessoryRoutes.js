const express = require("express");
const AccessoryController = require("../controllers/accessoryController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", AccessoryController.getAllAccessories);
router.get("/history/all", AccessoryController.getAccessoryHistory);

// Protected routes
router.put("/:id", verifyToken, AccessoryController.updateAccessory);
router.post("/:id", verifyToken, AccessoryController.checkoutAccessory);
router.delete("/history/:id", verifyToken, AccessoryController.deleteAccessoryHistory);

module.exports = router;