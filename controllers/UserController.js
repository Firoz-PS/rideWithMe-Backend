const User = require("../models/UserModel");


// function to create a new user 
const createUser = async (req, res) => {
  const user = new User({
    _id: req.body.userId,
    fullName: req.body.fullName,
    emailId: req.body.emailId,
    mobileNo: req.body.mobileNo,
    profileUrl: "",
  });

  user
    .save()
    .then(
      res.status(200).send({
        message: "user registered successfully",
        user: [
          {
            userId: user._id,
            fullName: user.fullName,
            emailId: user.emailId,
            mobileNo: user.mobileNo,
            profileUrl: user.profileUrl,
          },
        ],
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
          user: {
            userId: user._id,
            fullName: user.fullName,
            emailId: user.emailId,
            mobileNo: user.mobileNo,
            profileUrl: user.profileUrl,
          },
        });
    })
    .catch((err) => {
      res.status(404).send({ message: "User Not found." });
      console.log(err);
    });
};

module.exports = {
  createUser,
  fetchUserProfile,
};
