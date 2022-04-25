/** @format */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { admins } = require("./data/admins");
const { entrepreneurs } = require("./data/entrepreneurs");
const cors = require("cors");
const { connectDatabase } = require("./config/MongoDb");


const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
connectDatabase();

app.get("/", (req, res) => {
  res.send(`server is running on port ${PORT}`);
});

//? get admins from server
app.get("/api/admins", (req, res) => {
  res.json(admins);
});

//? get admin by id
app.get("/api/admins/:id", (req, res) => {
  const { id } = req.params;
  const admin = admins.find((admin) => admin.id === parseInt(id));
  if (!admin) {
    res.status(404).json({ msg: "admin not found" });
  } else {
    res.json(admin);
  }
});

//? get entrepreneurs from server
app.get("/api/entrepreneurs", (req, res) => {
  res.json(entrepreneurs);
});

//? get entrepreneur by id
app.get("/api/entrepreneurs/:id", (req, res) => {
  const { id } = req.params;
  const entrepreneur = entrepreneurs.find(
    (entrepreneur) => entrepreneur.id === parseInt(id)
  );
  if (!entrepreneur) {
    res.status(404).json({ msg: "admin not found" });
  } else {
    res.json(entrepreneur);
  }
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
