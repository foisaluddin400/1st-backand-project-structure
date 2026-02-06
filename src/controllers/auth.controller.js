import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Token generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= REGISTER =================
// type: "user" or "admin" passed in body
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: `${role || "User"} already exists` });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    res.status(201).json({
      message: `${user.role} registered successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
// single route for user/admin
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // set by auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "get profile successfull",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin")
      return res.status(403).json({ message: "Access denied. Admin only" });

    const users = await User.find().select("-password");
    res.status(200).json({
        
         message: "User Get successfull",
        data: users
    
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
