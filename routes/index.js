var express = require('express');
var router = express.Router();

router.get("/ping", function (req, res) {
    return res.status(200).send("pong");
});

router.use('/user', require('./UserRoute'));
router.use('/vehicle', require('./VehicleRoute'));
router.use('/ride-offer', require('./RideofferRoute.js'));
router.use('/ride-request', require('./RiderequestRoute.js'));

module.exports = router;