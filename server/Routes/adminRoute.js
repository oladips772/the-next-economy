/** @format */
const express = require("express");
const asyncHandler = require("express-async-handler");
const protect = require("../Middleware/authMiddleware");
const adminRouter = express.Router();
const Admin = require("../Models/adminModel");
const generateToken = require("../utils/generateToken");

// ? get admins
adminRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const admins = await Admin.find({});
    res.json(admins);
  })
);

// ? login admin
adminRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!email || !password) {
      throw new Error("password and email are required!");
    }

    if (admin?.isAdmin === false) {
      throw new Error("disabled account!");
    } else {
      if (admin && (await admin.matchPassword(password))) {
        res.json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          isAdmin: admin.isAdmin,
          masterAdmin: admin?.masterAdmin,
          token: generateToken(admin._id),
          createdAt: admin.createdAt,
        });
      } else {
        res.status(401);
        throw new Error("wrong email or password");
      }
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

    if (!name || !email || !password) {
      throw new Error("please fill all fields");
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

// ? admin get profile
adminRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id)
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        masterAdmin: admin.masterAdmin,
        password: admin.password,
        createdAt: admin.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("invalid token");
    }
  })
);

// ? admin profile update
adminRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (admin) {
      (admin.name = req.body.name || admin.name),
        (admin.email = req.body.email || admin.email);
      if (req.body.password) {
        admin.password = req.body.password;
      }
      const updatedAdmin = await admin.save();
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        isAdmin: updatedAdmin.isAdmin,
        masterAdmin: updatedAdmin.masterAdmin,
        password: updatedAdmin.password,
        createdAt: updatedAdmin.createdAt,
        token: generateToken(updatedAdmin._id),
      });
    } else {
      res.status(401);
      throw new Error("admin not found");
    }
  })
);

// ? admin delete
adminRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (admin) {
      res.json({ msg: `entrepreneur deleted ${req.params.id}` });
    } else {
      throw new Error("entrepreneur not found");
    }
  })
);

// ? disable admin by id from server route
adminRouter.put(
  "/disable/:id",
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.isAdmin = false;
      const updatedAdmin = await admin.save();
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        isAdmin: updatedAdmin.isAdmin,
        createdAt: updatedAdmin.createdAt,
      });
    } else {
      throw new Error("entrepreneur not found");
    }
  })
);

// ? enabled admin by id from server route
adminRouter.put(
  "/enable/:id",
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.isAdmin = true;
      const updatedAdmin = await admin.save();
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        isAdmin: updatedAdmin.isAdmin,
        createdAt: updatedAdmin.createdAt,
      });
    } else {
      throw new Error("admin not found");
    }
  })
);

module.exports = adminRouter;
