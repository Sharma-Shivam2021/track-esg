const express = require("express");

const authMiddleware = require("../controllers/authMiddleware");

const router = express.Router();

const carpoolController = require("../controllers/carpool");

router.post(
  "/create",
  authMiddleware.requireAuth,
  carpoolController.postCarpoolCreate
);

router.get(
  "/search",
  authMiddleware.requireAuth,
  carpoolController.getCarpoolSearch
);

router.get(
  "/search-all",
  authMiddleware.requireAuth,
  carpoolController.getAllCarpool
);

router.delete(
  "/delete/:id",
  authMiddleware.requireAuth,
  carpoolController.deleteCarpool
);

module.exports = router;
