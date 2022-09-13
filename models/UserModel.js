const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      default:
        "https://i.postimg.cc/Jh5dwmg5/Untitled-100-924-px-200-100-px-40-40-px-100-100-px-200-200-px-400-400-px.png",
    },
    role: {
      type: String,
      enum: ["RIDER", "PASSENGER"],
      default: "PASSENGER",
      required: true,
    },
    vehicleId: {
      type: String,
    },
  })
);

module.exports = User;