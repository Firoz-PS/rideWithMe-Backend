const Vehicle = require("../models/VehicleModel");

// utility function to return the vehicle object
const returnVehicle = (vehicle) => {
  return {
    vehicleId: vehicle._id,
    vehicleType: vehicle.vehicleType,
    vehicleName: vehicle.vehicleName,
    vehicleDetails: vehicle.vehicleDetails,
    vehicleNumber: vehicle.vehicleNumber,
    maxCapacity: vehicle.maxCapacity
  };
};

// function to create  new vehicle
const createVehicle = async () => {
  const vehicle = new Vehicle({});
  await vehicle.save()
      
  if (vehicle.id) {
    return vehicle.id;
  } else {
    console.log("some error happened");
    return;
  }
};

// function to fetch the details of a vehicle using the id
const fetchVehicleDetails = (req, res) => {
    Vehicle.findById(req.params.id)
      .then((vehicle) => {
        res.status(200).send({
          message: "Vehicle found successfully",
          vehicle: returnVehicle(vehicle),
        });
      })
      .catch((err) => {
        res.status(404).send({ message: "Vehicle Not found." });
        console.log(err);
      });
  };

// function to update the details of a vehicle
const updateVehicleDetails = (req, res) => {
    Vehicle.findByIdAndUpdate(req.params.id, { $set: req.body }, { upsert: true, useFindAndModify: false, new: true })
      .then((updatedVehicle) => {
        res.status(200).send({
          message: "vehicle updated successfully",
          vehicle: returnVehicle(updatedVehicle),
        });
      })
      .catch((err) => {
        res.status(404).send({ message: "Vehicle Not found." });
        console.log(err);
      })
      .catch((err) => {
        res.status(500).send({ message: "failed to update vehicle" });
        console.log(err);
      });
};

module.exports = {
  createVehicle,
  fetchVehicleDetails,
  updateVehicleDetails,
};
