import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  resendOtp,
  getProfile,
  getAllUsers,
} from "../controllers/auth.controller.js";

import {
  forgotPassword,
  verifyResetOtp,
  setNewPassword,
  changePassword,
} from "../controllers/password.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// ─── Auth ─────────────────────────────────────────
router.post("/register", registerUser);           
router.post("/verify", verifyUser);              
router.post("/resend-otp", resendOtp);            
router.post("/login", loginUser);                 

// ─── Forgot Password Flow (3 step) ────────────────
router.post("/forgot-password", forgotPassword);      // STEP 1: Email দাও → OTP পাঠাবে
router.post("/verify-reset-otp", verifyResetOtp);     // STEP 2: OTP দাও → resetToken পাবে
router.post("/set-new-password", setNewPassword);     // STEP 3: resetToken + new pass দাও

// ─── Change Password (logged-in user) ─────────────
router.post("/change-password", protect, changePassword); // Current + new pass দাও

// ─── Profile ──────────────────────────────────────
router.get("/profile", protect, getProfile);
router.get("/all", protect, getAllUsers);

export default router;