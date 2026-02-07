import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// Create review
export const createReview = asyncHandler(async (req, res) => {
  const { productId, comment, rating } = req.body;
  const userId = req.user._id;

  if (!productId || !comment || !rating) {
    throw new ApiError(400, "All fields are required");
  }

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const existingReview = await Review.findOne({ product: productId, user: userId });
  if (existingReview) throw new ApiError(400, "You already reviewed this product");

  const review = await Review.create({
    product: productId,
    user: userId,
    comment,
    rating,
  });

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

// Get reviews for a product
export const getProductReviews = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const reviews = await Review.find({ product: productId }).populate("user", "name email");

  res.status(200).json({
    success: true,
    totalReviews: reviews.length,
    data: reviews,
  });
});

// Get reviews by logged-in user
export const getMyReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const reviews = await Review.find({ user: userId }).populate("product", "title price");

  res.status(200).json({
    success: true,
    totalReviews: reviews.length,
    data: reviews,
  });
});
