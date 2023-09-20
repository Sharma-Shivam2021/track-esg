const express = require('express');

const router = express.Router();

const carpoolController = require('../controllers/carpool');

router.post("/create", carpoolController.postCarpoolCreate);

router.get("/search", carpoolController.getCarpoolSearch);

router.get("/search-all", carpoolController.getAllCarpool);

router.delete("/delete/:id", carpoolController.deleteCarpool);

module.exports = router;