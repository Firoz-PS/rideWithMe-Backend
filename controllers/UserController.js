const User = require("../models/UserModel");
const UserRoleTypes = require("../constants/UserRoleTypes");

// utility function to return the user object
const returnUser = (user) => {
  return {
    userId: user._id,
    fullName: user.fullName,
    emailId: user.emailId,
    mobileNo: user.mobileNo,
    profileUrl: user.profileUrl,
    role: user.role,
  };
}


// function to create a new user
const createUser = async (req, res) => {
  const user = new User({
    _id: req.body.userId,
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    mobileNo: req.body.mobileNo,
    profileUrl: "",
    role: UserRoleTypes.PASSENGER,
  });

  user
    .save()
    .then(
      res.status(200).send({
        message: "user registered successfully",
        user: returnUser(user),
      })
    )
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
  User.findByIdAndUpdate(req.body.userId, {
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    profileUrl: req.body.profileUrl,
  })
    .then((user) => {
      res.status(200).send({
        message: "user updated successfully",
        user: returnUser(user),
      });
    })
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    }).catch((err) => {
      res.status(500).send({ message: "failed to update user" });
      console.log(err);
    }
  );
}

// function to update the role of a user
const updateUserRole = (req, res) => {

  if (req.body.role !== UserRoleTypes.RIDER && req.body.role !== UserRoleTypes.PASSENGER) {
    res.status(400).send({ message: "Invalid role" });
    return;
  }

  User.findByIdAndUpdate(req.body.userId, {
    role: req.body.role,
  })
    .then((user) => {
      res.status(200).send({
        message: "user role uptated successfully",
      });
    })
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    }).catch((err) => {
      res.status(500).send({ message: "failed to update user role" });
      console.log(err);
    }
  );
}


module.exports = {
  createUser,
  fetchUserProfile,
  updateUserProfile,
  updateUserRole,
};
