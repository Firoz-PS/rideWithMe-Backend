const mongoose = require("mongoose");
const { Point } = require("./types");


const RideOffer = mongoose.model(
  "RideOffer",
  new mongoose.Schema({
    boardingPoint: {
      type: Point,
      required: true
    },
    currentPoint: Point,
    destinationPoint: {
      type: Point,
      required: true
    },
    startingTime: {
      type: Date,
      default: Date.now
    },
    rideStatus: {
      type: String,
      enum: ['YET_TO_START', 'ONGOING', 'COMPLETED', 'CANCELLED'],
      default: 'YET_TO_START'
    },
    availableSeats: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, { timestamps: true })
);

module.exports = RideOffer;