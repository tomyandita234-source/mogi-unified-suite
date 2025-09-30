const express = require('express');
const router = express.Router();
const userController = require('../controllers/prisma/userController');
const auth = require('../middleware/authMiddleware');

// Register new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get user profile (protected route)
router.get('/profile', auth, userController.getProfile);

// Get all users (admin only)
router.get('/', auth, userController.getAllUsers);

// Get user by ID (admin only)
router.get('/:id', auth, userController.getUserById);

// Update user (admin can update any user, users can update themselves)
router.put('/:id', auth, userController.updateUser);

// Delete user (admin only)
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;