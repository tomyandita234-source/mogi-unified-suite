const express = require('express');
const router = express.Router();
const blogController = require('../controllers/prisma/blogController');
const auth = require('../middleware/authMiddleware');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get single blog by ID
router.get('/:id', blogController.getBlogById);

// Create new blog (protected route)
router.post('/', auth, blogController.createBlog);

// Update blog (protected route)
router.put('/:id', auth, blogController.updateBlog);

// Delete blog (protected route)
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;