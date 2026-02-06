import express from "express";
import { registerUser, loginUser, getProfile, getAllUsers } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// register user/admin
router.post("/register", registerUser);

// login single route
router.post("/login", loginUser);

// profile route (protected)
router.get("/profile", protect, getProfile);

// get all users (admin-only)
router.get("/all", protect, getAllUsers);

export default router;
