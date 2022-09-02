const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    fullName: String,
    emailId: String,
    mobileNo: String,
    profileUrl: {
      type: String,
      default: "https://i.postimg.cc/Jh5dwmg5/Untitled-100-924-px-200-100-px-40-40-px-100-100-px-200-200-px-400-400-px.png"
    },
    role: String,
  })
);

module.exports = User;