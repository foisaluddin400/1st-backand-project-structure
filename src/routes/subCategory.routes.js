import express from "express";
import {
  createSubCategory,
  getSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategory.controller.js";
import protect, { adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// public GET
router.get("/", protect, getSubCategories); 
router.get("/:id", protect, getSingleSubCategory);

// admin-only
router.post("/", protect, adminOnly, createSubCategory);
router.put("/:id", protect, adminOnly, updateSubCategory);
router.delete("/:id", protect, adminOnly, deleteSubCategory);

export default router;
