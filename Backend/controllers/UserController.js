import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginInfo from "../models/LoginInfo.js"; 
import Actor from "../models/actorUser.js";
import Production from "../models/productionUser.js";

import dotenv from "dotenv";
dotenv.config();

// Register New Actor and Directors!
export  async function registerUser(req, res) {
  try {
    const { name, email, phone, password, role } = req.body;

    const existingUser = await LoginInfo.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newLogin = new LoginInfo({ email, password, hashedPassword, role });
    await newLogin.save();

    let userData;
    if (role === "actor")
      userData = new Actor({ name, email, phone, applied_jobs: [] });
    else if (role === "director")
      userData = new Production({
        name,
        email,
        phone,
        license: null,
        social_links: null,
      });
    else return res.status(400).json({ message: "Invalid role specified" });
    await userData.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error !! Try later", error });
  }
}

// Login User!
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials !!" });

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid Credentials! Incorrect Password" });

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
    res
      .status(200)
      .json({ message: "Login Successfully!!", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server Error!!", error });
  }
}

// Get Profile For Navigating
export async function getProfile(req, res) {
  try {
    const { id, role } = req.user;
    let userProfile;

    if (role === "actor")
      userProfile = await _findOne({ email: req.user.email });
    else if (role === "director")
      userProfile = await __findOne({ email: req.user.email });
    else return res.status(400).json({ message: "Invalid role" });

    if (!userProfile)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
