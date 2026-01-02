const express = require('express');
const router = express.Router();

// Correct import (VERY IMPORTANT)
const { register, login } = require('../controllers/authController');

//  Auth routes must be POST
router.post('/register', register);
router.post('/login', login);

module.exports = router;

