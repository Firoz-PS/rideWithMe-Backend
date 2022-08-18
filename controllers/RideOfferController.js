const RideOffer = require("../models/RideOfferModel");

const verifyRideOffer = async (data) => {
    var response = {
        "status": 200,
        "message": "Ride offer is valid"
    }
    return response;
}

// function to create a new ride offer
const createRideOffer = async (req, res) => {
    var verification = await verifyRideOffer(req.body);
    if (!(verification['status'] === 200)) return res.status(verification['status']).end({ message: verification['message'] });

    const rideOfferHandle = new RideOffer(req.body);
    rideOfferHandle
        .save()
        .then((data) => {
            res.status(200).send({
                message: "Ride offer created successfully",
                rideOffer: [
                    {
                        rideOfferId: rideOfferHandle._id,
                    },
                ],
            })
        }
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ message: "Failed to create ride offer" });
        });
};

module.exports = {
    createRideOffer
};
