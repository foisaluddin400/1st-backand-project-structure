import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

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

  res.json({
    success: true,
    data: products,
  });
});

// GET SINGLE
export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json({
    success: true,
    data: product,
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
