const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Get token from various sources
    let token = null;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    // Check cookies if token not found in header
    else if (
      req.cookies &&
      process.env.COOKIE_NAME &&
      req.cookies[process.env.COOKIE_NAME]
    ) {
      token = req.cookies[process.env.COOKIE_NAME];
    }
    // Check body as last resort
    else if (req.body && req.body.token) {
      token = req.body.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    try {
      // Verify token with a fallback JWT_KEY if needed
      const secret =
        process.env.JWT_KEY || "fallback-secret-key-for-development";
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("Token verification failed:", err.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (err) {
    console.log("Auth middleware error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};

// Remove unused middleware functions since they're not needed for this application
