/** @format */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// ? login
adminSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
