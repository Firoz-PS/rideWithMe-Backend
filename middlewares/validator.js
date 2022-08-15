const User = require("../models/UserModel");

// function to check whether the given user already exists in the database
const checkDuplicateUser = (req, res, next) => {
    User.findById(req.userId)
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! User is already registered!" });
            return;
        }

        next();
    });
};

module.exports = {
  checkDuplicateUser
};
