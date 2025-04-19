const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(403).json({ message: "Token is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded data to the request object
    next(); // Proceed to the next middleware/route
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};