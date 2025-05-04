const express = require("express");
const EngineController = require("../controllers/engineController");
const { verifyToken, requireRole } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", EngineController.getAllEngines);
router.get("/history/all", EngineController.getEngineHistory);

// Protected routes
router.post(
  "/:id",
  verifyToken,
  requireRole(["user", "admin"]),
  EngineController.checkoutEngine
);
router.put(
  "/:id",
  verifyToken,
  requireRole(["admin"]),
  EngineController.updateEngine
);
router.delete(
  "/history/:id",
  verifyToken,
  requireRole(["admin"]),
  EngineController.deleteEngineHistory
);

module.exports = router;
