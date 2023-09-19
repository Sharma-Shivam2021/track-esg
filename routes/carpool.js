const express = require('express');

const router = express.Router();

const carpoolController = require('../controllers/carpool');

router.post("/create", carpoolController.postCarpoolCreate);

router.get("/search",carpoolController.getCarpoolSearch );

module.exports = router;