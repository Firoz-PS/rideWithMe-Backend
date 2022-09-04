const mongoose = require("mongoose");

const Vehicle = mongoose.model(
  "Vehicle",
  new mongoose.Schema({
    // all details related to a vehicle
    vehicleType: {
      type: String,
      enum: ["CAR", "BIKE"],
      default: "BIKE",
      required: true,
    },
    vehicleName: {
      type: String,
      default: "Bike",
      required: true,
    },
    vehicleDetails: {
      type: String,
      default: "",
    },
    vehicleNumber: {
      type: String,
      default: "XX 1234",
      required: true,
    },
    maxCapacity: {
      type: Number,
      default: 1,
      required: true,
    },
  })
);

module.exports = Vehicle;