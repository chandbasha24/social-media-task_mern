const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/submit', createUser);
router.get('/', getUsers);

module.exports = router;
