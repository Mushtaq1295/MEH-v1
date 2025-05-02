const express = require("express");
const EngineController = require("../controllers/engineController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", EngineController.getAllEngines);
router.get("/history/all", EngineController.getEngineHistory);

// Protected routes
router.put("/:id", verifyToken, EngineController.updateEngine);
router.post("/:id", verifyToken, EngineController.checkoutEngine);
router.delete(
  "/history/:id",
  verifyToken,
  EngineController.deleteEngineHistory
);

module.exports = router;
