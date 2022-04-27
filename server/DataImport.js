/** @format */
const express = require("express");
const Entrepreneur = require("./Models/enterpreneurModel");
const Admin = require("./Models/adminModel");
const { entrepreneurs } = require("./data/entrepreneurs");
const { admins } = require("./data/admins");
const asyncHandler = require("express-async-handler");

const ImportData = express.Router();

// ? entreprenuers data import
ImportData.post(
  "/entrepreneurs",
  asyncHandler(async (req, res) => {
    await Entrepreneur.remove({});
    const importEntrepreneurs = await Entrepreneur.insertMany(entrepreneurs);
    res.send({ importEntrepreneurs });
  })
);

// ? admins data import
ImportData.post(
  "/admins",
  asyncHandler(async (req, res) => {
    await Admin.remove({});
    const importAdmins = await Admin.insertMany(admins);
    res.send({ importAdmins });
  })
);

module.exports = ImportData;
