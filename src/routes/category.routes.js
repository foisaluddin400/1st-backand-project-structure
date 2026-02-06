import express from "express";
import {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import protect, { adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// public GET
router.get("/", protect, getCategories);
router.get("/:id", protect, getSingleCategory);

// admin-only
router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
