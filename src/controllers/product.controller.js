import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import Review from "../models/review.model.js";
// CREATE
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !price) {
    throw new ApiError(400, "Title and price are required");
  }

  const product = await Product.create({ title, description, price });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// GET ALL
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  // Fetch reviews for each product
  const productsWithReviews = await Promise.all(
    products.map(async (product) => {
      const reviews = await Review.find({ product: product._id }).populate(
        "user",
        "name email"
      );
      return {
        ...product._doc,
        reviews,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: productsWithReviews,
  });
});
// GET SINGLE
export const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const reviews = await Review.find({ product: productId }).populate("user", "name email");

  res.status(200).json({
    success: true,
    data: {
      ...product._doc,
      reviews,
    },
  });
});

// UPDATE
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});
