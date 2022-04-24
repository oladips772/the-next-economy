/** @format */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { admins } = require("./data/admins");

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", (req, res) => {
  res.send(`server is running on port ${PORT}`);
});

// get admins from server
app.get("/api/admins", (req, res) => {
  res.json(admins);
});

// get admin by id
app.get("/api/admins/:id", (req, res) => {
  const { id } = req.params;
  const admin = admins.find((admin) => admin.id === parseInt(id));
  if (!admin) {
    res.status(404).json({ msg: "admin not found" });
  } else {
    res.json(admin);
  }
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
