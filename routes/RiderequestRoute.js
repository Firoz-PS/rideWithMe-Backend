var express = require("express");
var router = express.Router();
const RideRequestController = require("../controllers/RideRequestController");
const firebaseAuth = require("../middlewares/firebaseAuth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [firebaseAuth.verifyToken], RideRequestController.getRideRequests);
router.get("/:rideRequestId", [firebaseAuth.verifyToken], RideRequestController.getRideRequest);
router.get("/user/:userId", [firebaseAuth.verifyToken], RideRequestController.getRideRequestsByUserId);
router.post("/", [firebaseAuth.verifyToken], RideRequestController.createRideRequest);
router.put("/:rideRequestId", [firebaseAuth.verifyToken], RideRequestController.putRideRequest);

module.exports = router;
