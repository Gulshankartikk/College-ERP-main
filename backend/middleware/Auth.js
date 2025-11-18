const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// 1. Verify Token (ONLY ONCE)
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invalid or expired token" });
  }
};

// 2. Check Admin Role
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, msg: "Admin access only" });
  }
  next();
};

// 3. Check Teacher Role
const isTeacher = (req, res, next) => {
  if (req.user?.role === "teacher" || req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, msg: "Teacher/Admin access only" });
};

module.exports = { verifyToken, isAdmin, isTeacher };
