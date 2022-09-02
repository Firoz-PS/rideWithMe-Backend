var express = require("express");
var router = express.Router();
const VehicleController = require("../controllers/VehicleController");
const firebaseAuth = require("../middlewares/firebaseAuth");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.post("/", [firebaseAuth.verifyToken], VehicleController.createVehicle);
router.put("/:id", [firebaseAuth.verifyToken], VehicleController.updateVehicleDetails);
router.get("/:id", [firebaseAuth.verifyToken], VehicleController.fetchVehicleDetails);

module.exports = router;
