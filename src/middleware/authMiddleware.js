import jwt from "jsonwebtoken";
import Session from "../models/sessionModel.js";

export const verifyToken =async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token });
    if (!session) return res.status(401).json({ message: 'Invalid session' });
    req.user = decoded; // { userId: ... }
    next(); // ✅ token valid, move forward
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
