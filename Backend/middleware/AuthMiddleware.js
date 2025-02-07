const jwt = require("jsonwebtoken");
const User = require("../models/LoginInfo");
require("dotenv").config();

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access Denied. No Token Provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid Token . user Not Found!" });
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
