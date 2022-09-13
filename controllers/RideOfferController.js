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

    const rideOfferHandle = new RideOffer({ ...req.body, userId: req.userId  });
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

const getRideOffer = async (req, res) => {
    var rideOfferId = req.params["rideOfferId"]
    RideOffer.find({availableSeats: {$gte:1}, _id: rideOfferId}, null, null,
        (err, updatedData) => {
            if (err || updatedData.length == 0) return res.status(500).send({ message: `Failed to fetch Ride offer with id ${rideOfferId}` });
            res.status(200).send({
                message: `Ride offer with id ${rideOfferId} is available`,
                rideOffer: updatedData,
            })
        })
};

const getRideOffersByUserId = async (req, res)=>{
    var reqUserId = req.params["userId"]
    RideOffer.find({availableSeats: {$gte:1}, userId: reqUserId}, null, null,
        (err, updatedData) => {
            if (err || updatedData.length == 0) return res.status(500).send({ message: `Failed to fetch Ride offers of userId ${reqUserId}` });
            res.status(200).send({
                message: `Available ride offers of userId ${reqUserId}`,
                rideOffer: updatedData,
            })
        })
}

module.exports = {
    getRideOffers,
    getRideOffer,
    getRideOffersByUserId,
    createRideOffer,
    putRideOffer
};
