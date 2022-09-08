const User = require("../models/UserModel");
const {createVehicle} = require("./VehicleController");

// utility function to return the user object
const returnUser = (user) => {
  const returnUser = {
    userId: user._id,
    fullName: user.fullName,
    emailId: user.emailId,
    mobileNo: user.mobileNo,
    profileUrl: user.profileUrl,
    role: user.role,
    vehicleId: user.vehicleId,
  };

  return returnUser;
};

// function to create a new user
const createUser = async (req, res) => {

  const user = new User({
    _id: req.userId,
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    mobileNo: req.mobileNo,
    profileUrl: req.body.profileUrl,
    role: req.body.role,
  });

  try {
      user.vehicleId = await createVehicle();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "failed to create vehicle for the user" });
  }

  user
    .save()
    .then((newUser) => {
      res.status(200).send({
        message: "user registered successfully",
        user: returnUser(newUser),
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "failed to create user" });
      console.log(err);
    });
};

// function to fetch the profile details of a user using the id passed as a path param
const fetchUserProfile = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send({
        message: "user found successfully",
        user: returnUser(user),
      });
    })
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    });
};

// function to update the profile details of a user
const updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(req.userId, { $set: req.body }, { upsert: true, useFindAndModify: false, new: true })
    .then((updatedUser) => {
      res.status(200).send({
        message: "user updated successfully",
        user: returnUser(updatedUser),
      });
    })
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    })
    .catch((err) => {
      res.status(500).send({ message: "failed to update user" });
      console.log(err);
    });
};

// function to update the role of a user
const updateUserRole = (req, res) => {
  User.findByIdAndUpdate(
    req.userId,
    {
      role: req.body.role,
    },
    { new: true }
  )
    .then(
      res.status(200).send({
        message: "user role uptated successfully",
      })
    )
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    })
    .catch((err) => {
      res.status(500).send({ message: "failed to update user role" });
      console.log(err);
    });
};

module.exports = {
  createUser,
  fetchUserProfile,
  updateUserProfile,
  updateUserRole,
};
