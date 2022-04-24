/** @format */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express.Router();
app.get("/", () => {
  console.log(`server running on ${PORT}`);
});
