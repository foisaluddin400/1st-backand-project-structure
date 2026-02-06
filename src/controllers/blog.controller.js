import Blog from "../models/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const blog = await Blog.create({ title, description });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

// GET ALL BLOGS
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.json({
    success: true,
    data: blogs,
  });
});

// GET SINGLE BLOG
export const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.json({
    success: true,
    data: blog,
  });
});

// UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.json({
    success: true,
    message: "Blog updated successfully",
    data: blog,
  });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});
