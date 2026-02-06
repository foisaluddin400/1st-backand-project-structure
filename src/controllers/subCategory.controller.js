import SubCategory from "../models/subCategory.model.js";
import Category from "../models/category.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// CREATE SUBCATEGORY - Admin only
export const createSubCategory = asyncHandler(async (req, res) => {
  const { categoryId, subName, subDescription } = req.body;
  if (!categoryId || !subName)
    throw new ApiError(400, "categoryId and subName are required");

  // check category exists
  const category = await Category.findById(categoryId);
  if (!category) throw new ApiError(404, "Category not found");

  const subCategory = await SubCategory.create({
    category: categoryId,
    subName,
    subDescription,
  });

  res.status(201).json({
    success: true,
    message: "SubCategory created successfully",
    data: subCategory,
  });
});

// GET ALL SUBCATEGORIES
export const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find().populate("category", "name");
  res.json({ success: true, data: subCategories });
});

// GET SINGLE SUBCATEGORY
export const getSingleSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id).populate(
    "category",
    "name"
  );
  if (!subCategory) throw new ApiError(404, "SubCategory not found");

  res.json({ success: true, data: subCategory });
});

// UPDATE SUBCATEGORY - Admin only
export const updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!subCategory) throw new ApiError(404, "SubCategory not found");

  res.json({ success: true, message: "SubCategory updated", data: subCategory });
});

// DELETE SUBCATEGORY - Admin only
export const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subCategory) throw new ApiError(404, "SubCategory not found");

  res.json({ success: true, message: "SubCategory deleted" });
});
