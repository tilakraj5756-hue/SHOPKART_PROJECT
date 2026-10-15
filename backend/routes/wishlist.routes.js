const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { addToWishlist } = require("../controllers/wishlist.controller");

const router = express.Router();

router.post("/:productId", authMiddleware, addToWishlist);

module.exports = router;