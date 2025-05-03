const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, role: user.role }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const requireRole = (roles) => (req, res, next) => {
  console.log(req.user);
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Insufficient permissions",
    });
  }
  next();
};

module.exports = { verifyToken, requireRole };
