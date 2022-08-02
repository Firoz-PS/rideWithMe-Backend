const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: String,
    fullName: String,
    emailId: String,
    mobileNo: String,
    profileUrl: String
  })
);

module.exports = User;