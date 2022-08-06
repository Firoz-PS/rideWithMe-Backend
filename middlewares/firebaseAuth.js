const { auth } = require("../firebaseAdmin");

exports.verifyToken = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(401).json({ error: "Unauthorized" });
  }

    auth
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.token = decodedToken;
      req.userId = req.user.uid;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(401).json(err);
    });
};
