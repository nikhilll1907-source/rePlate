const express = require('express');
const router = express.Router();

const login = require('../controllers/login.controller');
const signup = require('../controllers/signup.controller');

// Routes
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;