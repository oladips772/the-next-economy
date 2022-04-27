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
    res.json({ entrepreneurs });
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
      res.json({ entrepreneur });
    }
  })
);

module.exports = entrepreneurRouter;
