const mongoose = require("mongoose");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

async function addToWishlist(req, res) {
  try {
    const { productId } = req.params;

    // Check if productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the currently logged-in customer
    const customer = await Customer.findById(req.user._id);

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if product is already in wishlist
    if (customer.wishlist.includes(productId)) {
      return res.status(409).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Add product ID to wishlist
    customer.wishlist.push(productId);

    // Save customer
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  addToWishlist,
};