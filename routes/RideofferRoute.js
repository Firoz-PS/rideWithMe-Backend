var express = require("express");
var router = express.Router();
const RideOfferController = require("../controllers/RideOfferController");
const firebaseAuth = require("../middlewares/firebaseAuth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.get("/", [firebaseAuth.verifyToken], RideOfferController.getRideOffers);
router.post("/", [firebaseAuth.verifyToken], RideOfferController.createRideOffer);
router.put("/:rideOfferId", [firebaseAuth.verifyToken], RideOfferController.putRideOffer);

module.exports = router;
