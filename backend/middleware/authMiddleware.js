const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // ✅ Ensure correct token format: "Bearer <token>"
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(400).json({ message: "Invalid token format" });
  }

  const token = tokenParts[1]; // Extract actual token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Ensure the decoded token has a valid `userId`
    if (!decoded.userId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }

    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
