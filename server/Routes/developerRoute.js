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
      gender,
      cohort,
      linkedinId,
      facebookId,
      remarks,
      paymentStatus,
      paymentBalance,
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
      !gender ||
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
      gender,
      linkedinId,
      facebookId,
      remarks,
      paymentStatus,
      paymentBalance,
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
        gender: developer.gender,
        cohort: developer.cohort,
        linkedinId: developer.linkedinId,
        facebookId: developer.facebookId,
        remarks:developer.remarks,
        paymentStatus: developer.paymentStatus,
        paymentBalance:developer.paymentBalance,
        createdBy: developer.createdBy,
        updatedBy: developer.updatedBy,
        createdAt: entrepreneur.createdAt,
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
        (developer.gender = req.body.gender || developer.gender),
        (developer.cohort = req.body.cohort || developer.cohort),
        (developer.linkedinId = req.body.linkedinId || developer.linkedinId),
        (developer.facebookId = req.body.facebookId || developer.facebookId),
        (developer.remarks = req.body.remarks || developer.remarks),
        (developer.paymentStatus = req.body.paymentStatus || developer.paymentStatus),
        (developer.paymentBalance = req.body.paymentBalance),
        (developer.createdBy = req.body.createdBy || developer.createdBy),
        (developer.updatedBy = req.body.updatedBy || developer.updatedBy);
      const updatedDeveloper = await developer.save();
      res.json({
        _id: updatedDeveloper._id,
        name: updatedDeveloper.name,
        email: updatedDeveloper.email,
        image: updatedDeveloper.image,
        phone: updatedDeveloper.phone,
        gender: updatedDeveloper.gender,
        cohort: updatedDeveloper.cohort,
        linkedinId: updatedDeveloper.linkedinId,
        facebookId: updatedDeveloper.facebookId,
        remarks:updatedDeveloper.remarks,
        paymentStatus: updatedDeveloper.paymentStatus,
        paymentBalance:updatedDeveloper.paymentBalance,
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
