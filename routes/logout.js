const logoutController = require('../controllers/logout');
const express = require("express");
const router = express.Router();
router.get("/logout", logoutController.logout);

module.exports = router;
