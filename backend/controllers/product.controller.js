const Product = require("../models/product.model");

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  createProduct,
};