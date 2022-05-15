/** @format */
const mongoose = require("mongoose");

const DeveloperSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "developer name is required"],
    },
    email: {
      type: String,
      require: [true, "developer email is required"],
      unique: true,
    },
    image: {
      type: String,
      require: [true, "developer image is required"],
    },
    phone: {
      type: String,
      require: [true, "developer phone Number is required"],
    },
    gender: {
      type: String,
      require: [true, "developer gender is required"],
    },
    cohort: {
      type: String,
      require: [true, "developer year is required"],
    },
    linkedinId: {
      type: String,
      require: [true, "developer linkedinId is required"],
    },
    facebookId: {
      type: String,
      require: [true, "developer facebookId is required"],
    },
    paymentStatus: {
      type: String,
      require: [true, "developer paymentStatus is required"],
    },
    paymentBalance: {
      type: String,
      require: [false],
    },
    createdBy: {
      type: String,
      require: [true, "developer createdBy is required"],
    },
    updatedBy: {
      type: String,
      require: [true, "developer updatedBy is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Developer = mongoose.model("Developer", DeveloperSchema);
module.exports = Developer;
