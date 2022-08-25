var express = require("express");
var router = express.Router();
const validator = require("../middlewares/validator");
const RideRequestController = require("../controllers/RideRequestController");
const firebaseAuth = require("../middlewares/firebaseAuth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", RideRequestController.getRideRequests)
router.post("/", RideRequestController.createRideRequest);
router.put("/:rideRequestId", RideRequestController.putRideRequest);

module.exports = router;
