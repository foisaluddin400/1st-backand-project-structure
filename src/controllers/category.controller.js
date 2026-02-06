import Category from "../models/category.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// CREATE CATEGORY - Admin only
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(400, "Category name is required");

  const category = await Category.create({ name, description });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// GET ALL CATEGORIES
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({ success: true, data: categories });
});

// GET SINGLE CATEGORY
export const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  res.json({ success: true, data: category });
});

// UPDATE CATEGORY - Admin only
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!category) throw new ApiError(404, "Category not found");

  res.json({ success: true, message: "Category updated", data: category });
});

// DELETE CATEGORY - Admin only
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  res.json({ success: true, message: "Category deleted" });
});
