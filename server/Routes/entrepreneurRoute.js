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

// ? update entrepreneur by id from server route
entrepreneurRouter.put(
  "/profile/:id",
  asyncHandler(async (req, res) => {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (entrepreneur) {
      (entrepreneur.name = req.body.name || entrepreneur.name),
        (entrepreneur.email = req.body.email || entrepreneur.email),
        (entrepreneur.image = req.body.image || entrepreneur.image),
        (entrepreneur.phone = req.body.phone || entrepreneur.phone),
        (entrepreneur.year = req.body.year || entrepreneur.year),
        (entrepreneur.bussiness = req.body.bussiness || entrepreneur.bussiness),
        (entrepreneur.bio = req.body.bio || entrepreneur.bio);
      const updatedEntrepreneur = await entrepreneur.save();
      res.json({
        _id: updatedEntrepreneur._id,
        name: updatedEntrepreneur.name,
        email: updatedEntrepreneur.email,
        image: updatedEntrepreneur.image,
        phone: updatedEntrepreneur.phone,
        year: updatedEntrepreneur.year,
        bussiness: updatedEntrepreneur.bussiness,
        bio: updatedEntrepreneur.bio,
        createdAt: updatedEntrepreneur.createdAt,
      });
    } else {
      throw new Error("entrepreneur not found");
    }
  })
);

// ? delete entrepreneur by id from server route
entrepreneurRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const entrepreneur = await Entrepreneur.findByIdAndDelete(req.params.id);
    if (entrepreneur) {
      res.json({ msg: `entrepreneur deleted ${req.params.id}` });
    } else {
      throw new Error("entrepreneur not found");
    }
  })
);



module.exports = entrepreneurRouter;
