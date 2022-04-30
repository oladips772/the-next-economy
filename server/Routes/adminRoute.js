/** @format */
const express = require("express");
const asyncHandler = require("express-async-handler");
const adminRouter = express.Router();
const Admin = require("../Models/adminModel");
const generateToken = require("../utils/generateToken");

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

module.exports = adminRouter;
