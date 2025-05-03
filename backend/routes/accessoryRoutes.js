const express = require("express");
const AccessoryController = require("../controllers/accessoryController");
const { verifyToken, requireRole } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", AccessoryController.getAllAccessories);
router.get("/history/all", AccessoryController.getAccessoryHistory);

// Protected routes
router.post(
  "/:id",
  verifyToken,
  requireRole(["user", "admin"]),
  AccessoryController.checkoutAccessory
);
router.put(
  "/:id",
  verifyToken,
  requireRole(["admin"]),
  AccessoryController.updateAccessory
);
router.delete(
  "/history/:id",
  verifyToken,
  requireRole(["admin"]),
  AccessoryController.deleteAccessoryHistory
);

module.exports = router;
