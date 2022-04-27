/** @format */
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "admin name is required"],
    },
    email: {
      type: String,
      require: [true, "admin email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "admin password is required"],
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;