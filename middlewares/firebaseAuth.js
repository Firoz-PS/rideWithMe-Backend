const { auth } = require("../firebaseAdmin");

exports.verifyToken = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    //idToken = req.headers.authorization.split("Bearer ")[1];
    console.log(idToken);
  } else {
    console.error("No token found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  auth
    .verifyIdToken(
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkMWIxOWYwZjU4ZTJjOWE5Njc3M2M5MmNmODA0NDEwMTc5NzEzMjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ycG9yYXRlLXJpZGUtc2hhcmluZy02YTBhYyIsImF1ZCI6ImNvcnBvcmF0ZS1yaWRlLXNoYXJpbmctNmEwYWMiLCJhdXRoX3RpbWUiOjE2NjAzOTE0NTYsInVzZXJfaWQiOiJCbUg5QlBkRjhtUGMzQTRWSWE3Uzh2dFc4cmoyIiwic3ViIjoiQm1IOUJQZEY4bVBjM0E0VklhN1M4dnRXOHJqMiIsImlhdCI6MTY2MDM5MTQ1NiwiZXhwIjoxNjYwMzk1MDU2LCJwaG9uZV9udW1iZXIiOiIrOTE5MDI0Mjc2ODkyIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE5MDI0Mjc2ODkyIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.KxX2WAl7EOvkGYitCq5RdoNlExJmrXhVuZQ28G1Y_7020SW7DjXp7-qkEkWZwvPfYtXkaucGAY0JY6IEIlXaoiVYRDZuW8_8M-aInxWF2cngiJfWjJh8cDBUi_As0kDBgu4aNSfrKdPQue4PAmyKGrBs-ThRpGEbTMh60O3tUQQCQL4ThNH5JAnHFHMkEzOsOHJ_knMzEE6jlCtcrrhSYL-7TttJ76bV24lPeUWfUVRSJjzZ9PKG1jzobqZandJ7cv_tbP6Ue5epXEKquGApeIzEfjwSp4txrnM8nhQXsOu5lYIMq8MTXKZftf4icnMiqNOX_TLxnqzsV6RLwHnSAQ"
    )
    .then((decodedToken) => {
      req.token = decodedToken;
      req.userId = req.user.uid;
      console.log(decodedToken);
      console.log(req.userId);
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(401).json(err);
    });
};
