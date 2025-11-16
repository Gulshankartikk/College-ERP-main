const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized Access" });
  }

  try {
    const cleanToken = token.replace("Bearer ", "");
    const decoded = await jwt.verify(cleanToken, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (Err) {
    return res.status(403).json({ success: false, msg: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized User" });
  }

  const cleanToken = token.replace("Bearer ", "");
  jwt.verify(
    cleanToken,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("Token Verification Failed", err.message);
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized User" });
      } else {
        if (decoded.role === "admin") {
          req.user = decoded;
          next();
        } else {
          console.log("User is Not Admin");
          return res.status(403).json({ success: false, message: "Forbidden" });
        }
      }
    }
  );
};

const isTeacher = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized User" });
  }

  const cleanToken = token.replace("Bearer ", "");
  jwt.verify(
    cleanToken,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("Token Verification Failed", err.message);
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized User" });
      } else {
        if (decoded.role === "teacher" || decoded.role === "admin") {
          req.user = decoded;
          next();
        } else {
          console.log("User is Not Teacher or Admin");
          return res.status(403).json({ success: false, message: "Forbidden" });
        }
      }
    }
  );
};

module.exports = { verifyToken, isAdmin, isTeacher };