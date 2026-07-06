import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

export const authenticateGraphQL = (req) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return null; // no token

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};