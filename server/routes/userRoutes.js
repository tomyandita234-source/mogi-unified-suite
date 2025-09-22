const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get user profile (protected route)
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;