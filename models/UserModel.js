const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    fullName: String,
    emailId: String,
    mobileNo: String,
    profileUrl: String,
    role: String,
  })
);

module.exports = User;