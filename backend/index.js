require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const customerRoutes = require("./routes/customer.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/customers", customerRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopKart API is running",
  });
});

const PORT = process.env.PORT || 3000;

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });