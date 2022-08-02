var express = require('express');
var router = express.Router();
const validator = require("../middlewares/validator")
const UserController = require("../controllers/UserController");

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// authJwt part to be edited using the firebase auth later

router.post('/', [validator.checkDuplicateUser], UserController.createUser);
//router.get("/:id", [authJwt.verifyToken], UserController.fetchUserProfile);
//router.put("/update", [authJwt.verifyToken], UserController.updateUser);
//router.put("/change-role", [authJwt.verifyToken], UserController.updateUserRole);


module.exports = router;