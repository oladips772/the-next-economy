/** @format */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "admin name is required"],
    },
    email: {
      type: String,
      required: [true, "admin email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "admin password is required"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
    masterAdmin: {
      type: Boolean,
      required: true,
      default: false,
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

// ? register
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
