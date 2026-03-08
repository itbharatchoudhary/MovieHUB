const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

/**
 * @use Protect routes that require authentication
 */
const protect = async (req, res, next) => {

  let token;

//   Check if the Authorization header is present and starts with "Bearer"
  if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {

        // Extract the token from the Authorization header
    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }

  } else {
    res.status(401).json({ message: "No token" });
  }
};

module.exports = protect;