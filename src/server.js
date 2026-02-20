import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/product", productRoutes);
app.use("/blog", blogRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);

app.use("/review", reviewRoutes);
// global error handler
app.get("/",(req,res)=> {
    // console.log(req.country);
    // res.redirect(`/${req.country}`);
    res.send("server is running . welcome .");
});
 
app.use(errorHandler);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://192.168.0.2:${PORT}`);
});
