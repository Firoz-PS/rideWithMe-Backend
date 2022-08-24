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

const putRideOffer = async (req, res) => {
    var verification = await verifyRideOffer(req.body);
    if (!(verification['status'] === 200)) return res.status(verification['status']).end({ message: verification['message'] });

    RideOffer.findByIdAndUpdate(req.params['rideOfferId'], { $set: req.body }, {upsert:true, useFindAndModify: false},
        (err, updatedData) => {
            if (err) return res.status(500).send({ message: "Failed to update ride offer" });
            res.status(200).send({
                message: "Ride offer updated successfully",
                rideOffer: updatedData,
            })
        })
};

const getRideOffers = async (req, res) => {
    RideOffer.find({availableSeats: {$gte:1}}, null, null,
        (err, updatedData) => {
            if (err) return res.status(500).send({ message: "Failed to fetch ride offers" });
            res.status(200).send({
                message: "Available ride offers",
                rideOffer: updatedData,
            })
        })
};

module.exports = {
    getRideOffers,
    createRideOffer,
    putRideOffer
};
