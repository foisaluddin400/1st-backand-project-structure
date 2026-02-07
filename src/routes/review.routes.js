import express from "express";
import { createReview, getProductReviews, getMyReviews } from "../controllers/review.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// add review (only logged-in users)
router.post("/", protect, createReview);

// get all reviews for a product
router.get("/product/:productId", protect, getProductReviews);

// get all reviews by logged-in user
router.get("/me", protect, getMyReviews);

export default router;
