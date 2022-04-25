/** @format */
const mongoose = require("mongoose");

const EntreprenuerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "entrepreneur name is required"],
    },
    email: {
      type: String,
      require: [true, "entrepreneur email is required"],
      unique: true,
    },
    phone: {
      type: Number,
      require: [true, "entrepreneur phone Number is required"],
      unique: true,
    },
    year: {
      type: Number,
      require: [true, "entrepreneur year is required"],
    },
    bussiness: {
      type: String,
      require: [true, "entrepreneur bussiness is required"],
    },
    bio: {
      type: String,
      require: [true, "entrepreneur bussiness is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Entrepreneur = mongoose.model("Entrepreneur", EntreprenuerSchema);
module.exports = Entrepreneur;
