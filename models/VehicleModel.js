const mongoose = require("mongoose");

const Vehicle = mongoose.model(
  "Vehicle",
  new mongoose.Schema({
    // all details related to a vehicle
    vehicleType: String,
    vehicleName: String,
    vehicleDetails: String,
    vehicleNumber: String,
    maxCapacity: Number
  })
);

module.exports = Vehicle;