const credentialController = require("../controllers/user-login-and-registration");
const express = require("express");
const router = express.Router();

router.post("/register", credentialController.register);

router.post("/login", credentialController.login);


module.exports = router;
