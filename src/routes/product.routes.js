import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import protect, { adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
