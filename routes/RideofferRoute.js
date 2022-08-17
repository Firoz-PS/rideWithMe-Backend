var express = require("express");
var router = express.Router();
const validator = require("../middlewares/validator");
const RideOfferController = require("../controllers/RideOfferController");
const firebaseAuth = require("../middlewares/firebaseAuth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.post("/", RideOfferController.createRideOffer);

module.exports = router;
