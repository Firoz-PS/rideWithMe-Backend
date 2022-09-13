const mongoose = require("mongoose");
const { Point } = require("./types");

const RideRequest = mongoose.model(
  "RideRequest",
  new mongoose.Schema({
    boardingPoint: {
      type: Point,
      required: true
    },
    destinationPoint: {
      type: Point,
      required: true
    },
    startingTime: {
      type: Date,
      default: Date.now,
      required: true
    },
    rideStatus: {
      type: String,
      enum: ['YET_TO_START', 'ONGOING', 'COMPLETED', 'CANCELLED'],
      default: 'YET_TO_START',
      required: true
    },
    seatsRequired: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    rideOfferId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RideOffer'
    }
  }, { timestamps: true })
);

module.exports = RideRequest;