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
    const {
      name,
      email,
      image,
      phone,
      year,
      bussiness,
      bio,
      linkedinId,
      facebookId,
      status,
      createdBy,
      updatedBy,
    } = req.body;
    const userExists = await Entrepreneur.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("entrepreneur already exist");
    }

    if (
      !name ||
      !email ||
      !image ||
      !phone ||
      !year ||
      !bussiness ||
      !bio ||
      !linkedinId ||
      !facebookId
    ) {
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
      linkedinId,
      facebookId,
      status,
      createdBy,
      updatedBy,
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
        linkedinId: entrepreneur.linkedinId,
        facebookId: entrepreneur.facebookId,
        status: entrepreneur.status,
        createdBy: entrepreneur.createdBy,
        updatedBy: entrepreneur.updatedBy,
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
        (entrepreneur.bio = req.body.bio || entrepreneur.bio),
        (entrepreneur.linkedinId =
          req.body.linkedinId || entrepreneur.linkedinId),
        (entrepreneur.facebookId =
          req.body.facebookId || entrepreneur.facebookId),
        (entrepreneur.status = req.body.status || entrepreneur.status),
        (entrepreneur.createdBy = req.body.createdBy || entrepreneur.createdBy),
        (entrepreneur.updatedBy = req.body.updatedBy || entrepreneur.updatedBy);
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
        linkedinId: updatedEntrepreneur.linkedinId,
        facebookId: updatedEntrepreneur.facebookId,
        status: updatedEntrepreneur.status,
        createdBy: updatedEntrepreneur.createdBy,
        updatedBy: updatedEntrepreneur.updatedBy,
        createdAt: updatedEntrepreneur.createdAt,
      });
    } else {
                
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
