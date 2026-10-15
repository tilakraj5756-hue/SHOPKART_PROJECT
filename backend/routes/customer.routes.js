const express = require("express");

const {
  registerCustomer,
  loginCustomer,
  getMyProfile,
  logoutCustomer,
} = require("../controllers/customer.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerCustomer);

// Login
router.post("/login", loginCustomer);

// Protected profile
router.get("/me", authMiddleware, getMyProfile);

// Protected logout
router.post("/logout", authMiddleware, logoutCustomer);

module.exports = router;