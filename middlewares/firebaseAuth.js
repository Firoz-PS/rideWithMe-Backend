const { admin } = require("../firebaseAdmin");

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

exports.verifyToken = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.userId = userInfo.uid;
      req.mobileNo = userInfo.phone_number;
      return next();
    } catch (error) {
      console.log("Error while verifying token ", error);
      return res.status(401).send({ error: "You are not authorized to make this request" });
    }
  });
};
