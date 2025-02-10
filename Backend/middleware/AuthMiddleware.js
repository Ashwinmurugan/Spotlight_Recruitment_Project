import jwt from "jsonwebtoken";
import LoginInfo from "../models/LoginInfo.js";
import dotenv from "dotenv";
dotenv.config();

export default function authenticateUser(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No Token Provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    LoginInfo.findById(req.user.id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Invalid Token. User Not Found!" });
        }
        next();
      })
      .catch(() => res.status(500).json({ message: "Server Error" }));
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}
