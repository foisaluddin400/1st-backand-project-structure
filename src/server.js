import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/product", productRoutes);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
