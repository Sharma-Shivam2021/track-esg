const adminController = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.get("/dashboard", adminController.adminDashboard);

module.exports = router;