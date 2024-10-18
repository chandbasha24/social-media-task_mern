// adminRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const { adminLogin } = require('../controllers/adminController'); // Adjust the path as needed
const router = express.Router();

router.post('/login', adminLogin);

module.exports = router;
