/** @format */
const express = require("express");
const asyncHandler = require("express-async-handler");
const entrepreneurRouter = express.Router();
const Entrepreneur = require("../Models/enterpreneurModel");

// ? get entrepreneurs from server route
entrepreneurRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const entrepreneurs = await Entrepreneur.find({});
    res.json(entrepreneurs);
  })
);

// ? create entrepreneur sever route
entrepreneurRouter.post(
  "/create",
  asyncHandler(async (req, res) => {
    const { name, email, image, phone, year, bussiness, bio } = req.body;
    const userExists = await Entrepreneur.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("entrepreneur already exists");
    }

    if (!name || !email || !image || !phone || !year || !bussiness || !bio) {
      throw new Error("please fill all fields");
    }

    const entrepreneur = await Entrepreneur.create({
      name,
      email,
      image,
      phone,
      year,
      bussiness,
      bio,
    });
    if (entrepreneur) {
      res.status(201).json({
        _id: entrepreneur._id,
        name: entrepreneur.name,
        email: entrepreneur.email,
        image: entrepreneur.image,
        phone: entrepreneur.phone,
        year: entrepreneur.year,
        bussiness: entrepreneur.bussiness,
        bio: entrepreneur.bio,
        createdAt: entrepreneur.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("invalid entrepreneur credentials");
    }
  })
);

// ? get entrepreneur by id from server route
entrepreneurRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) {
      res.status(404).json({ msg: "entrepreneur not found" });
    } else {
      res.json(entrepreneur);
    }
  })
);

module.exports = entrepreneurRouter;
