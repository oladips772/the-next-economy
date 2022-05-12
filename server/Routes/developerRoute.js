/** @format */
const express = require("express");
const asyncHandler = require("express-async-handler");
const developerRouter = express.Router();
const Developer = require("../Models/developerModel");

// ? get developers from server route
developerRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const developers = await Developer.find({});
    res.json(developers);
  })
);

// ? create developer sever route
developerRouter.post(
  "/create",
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      image,
      phone,
      cohort,
      linkedinId,
      facebookId,
      createdBy,
      updatedBy,
    } = req.body;

    const developerExists = await Developer.findOne({ email });
    if (developerExists) {
      throw new Error("developer already exist");
    }

    if (
      !name ||
      !email ||
      !image ||
      !phone ||
      !cohort ||
      !linkedinId ||
      !facebookId
    ) {
      throw new Error("please fill all fields");
    }

    const developer = await Developer.create({
      name,
      email,
      image,
      phone,
      cohort,
      linkedinId,
      facebookId,
      createdBy,
      updatedBy,
    });

    if (developer) {
      res.status(201).json({
        _id: developer._id,
        name: developer.name,
        email: developer.email,
        image: developer.image,
        phone: developer.phone,
        cohort: developer.cohort,
        linkedinId: developer.linkedinId,
        facebookId: developer.facebookId,
        createdBy: developer.createdBy,
        updatedBy: developer.updatedBy,
        createdAt: entrepreneur.createdAt
      });
    } else {
      res.status(400);
      throw new Error("invalid devloper credentials");
    }
  })
);

// ? get developer by id from server route
developerRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const developer = await Developer.findById(req.params.id);
    if (developer) {
      res.json(developer);
    } else {
      throw new Error("developer not found ");
    }
  })
);

// ? delete developer from server route
developerRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const developer = await Developer.findByIdAndDelete(req.params.id);
    if (developer) {
      res.json({ message: `developer with id ${req.params.id} deleted` });
    } else {
      throw new Error("developer not found ");
    }
  })
);

// ? update developer by id from server route
developerRouter.put(
  "/profile/:id",
  asyncHandler(async (req, res) => {
    const developer = await Developer.findById(req.params.id);
    if (developer) {
      (developer.name = req.body.name || developer.name),
        (developer.email = req.body.email || developer.email),
        (developer.image = req.body.image || developer.image),
        (developer.phone = req.body.phone || developer.phone),
        (developer.cohort = req.body.cohort || developer.cohort),
        (developer.linkedinId = req.body.linkedinId || developer.linkedinId),
        (developer.facebookId = req.body.facebookId || developer.facebookId),
        (developer.createdBy = req.body.createdBy || developer.createdBy),
        (developer.updatedBy = req.body.updatedBy || developer.updatedBy);
      const updatedDeveloper = await developer.save();
      res.json({
        _id: updatedDeveloper._id,
        name: updatedDeveloper.name,
        email: updatedDeveloper.email,
        image: updatedDeveloper.image,
        phone: updatedDeveloper.phone,
        cohort: updatedDeveloper.cohort,
        linkedinId: updatedDeveloper.linkedinId,
        facebookId: updatedDeveloper.facebookId,
        createdBy: updatedDeveloper.createdBy,
        updatedBy: updatedDeveloper.updatedBy,
        createdAt: updatedDeveloper.createdAt,
      });
    } else {
      throw new Error("developer not found ");
    }
  })
);

module.exports = developerRouter;