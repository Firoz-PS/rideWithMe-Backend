const RideRequest = require("../models/RideRequestModel");

const verifyRideRequest = async (data) => {
  var response = {
    status: 200,
    message: "Ride request is valid",
  };
  return response;
};

// function to create a new ride request
const createRideRequest = async (req, res) => {
  var verification = await verifyRideRequest(req.body);
  if (!(verification["status"] === 200))
    return res.status(verification["status"]).end({ message: verification["message"] });

  const rideRequestHandle = new RideRequest({ ...req.body, userId: req.userId  });
  rideRequestHandle
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Ride request created successfully",
        rideRequest: [
          {
            rideRequestId: rideRequestHandle._id,
          },
        ],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Failed to create ride request" });
    });
};

const putRideRequest = async (req, res) => {
  var verification = await verifyRideRequest(req.body);
  if (!(verification["status"] === 200))
    return res.status(verification["status"]).end({ message: verification["message"] });

  RideRequest.findByIdAndUpdate(
    req.params["rideRequestId"],
    { $set: req.body },
    { upsert: true, useFindAndModify: false },
    (err, updatedData) => {
      if (err) return res.status(500).send({ message: "Failed to update ride request" });
      res.status(200).send({
        message: "Ride request updated successfully",
        rideRequest: updatedData,
      });
    }
  );
};

const getRideRequests = async (req, res) => {
  RideRequest.find({ seatsRequired: { $gte: 0 } }, null, null, (err, updatedData) => {
    if (err) return res.status(500).send({ message: "Failed to fetch ride requests" });
    res.status(200).send({
      message: "Available ride requests",
      rideRequest: updatedData,
    });
  });
};

const getRideRequest = async (req, res) => {
  var rideRequestId = req.params["rideRequestId"]
  RideRequest.find({seatsRequired: {$gte:1}, _id: rideRequestId}, null, null,
      (err, updatedData) => {
          if (err || updatedData.length == 0) return res.status(500).send({ message: `Failed to fetch Ride request with id ${rideRequestId}` });
          res.status(200).send({
              message: `Ride request with id ${rideRequestId} is available`,
              rideRequest: updatedData,
          })
      })
};

const getRideRequestsByUserId = async (req, res)=>{
  var reqUserId = req.params["userId"]
  RideRequest.find({seatsRequired: {$gte:1}, userId: reqUserId}, null, null,
      (err, updatedData) => {
          if (err || updatedData.length == 0) return res.status(500).send({ message: `Failed to fetch ride requests of userId ${reqUserId}` });
          res.status(200).send({
              message: `Available ride requests of userId ${reqUserId}`,
              rideRequest: updatedData,
          })
      })
}

module.exports = {
  getRideRequests,
  getRideRequest,
  getRideRequestsByUserId,
  createRideRequest,
  putRideRequest,
};
