const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const user = await User.validate(req.headers);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized or expired token!" });
  } else {
    req.user = user;
    next();
  }
};

module.exports = authMiddleware;
