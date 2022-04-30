/** @format */
const express = require("express");
const asyncHandler = require("express-async-handler");
const protect = require("../Middleware/authMiddleware");
const adminRouter = express.Router();
const Admin = require("../Models/adminModel");
const generateToken = require("../utils/generateToken");

// ? login admin
adminRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        token: generateToken(admin._id),
        createdAt: admin.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("invalid credentials");
    }
  })
);

// ? register admin
adminRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("admin already exists");
    }
    const admin = await Admin.create({ email, password, name });
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid admin credentials");
    }
  })
);

// ? admin profile
adminRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        createdAt: admin.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("invalid token");
    }
  })
);

module.exports = adminRouter;
