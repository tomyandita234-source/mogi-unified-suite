const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get single blog by ID
router.get('/:id', blogController.getBlogById);

// Create new blog
router.post('/', (req, res, next) => {
  const upload = req.app.locals.upload;
  upload.single('image')(req, res, (err) => {
    if (err) return next(err);
    next();
  });
}, blogController.createBlog);

// Update blog
router.put('/:id', (req, res, next) => {
  const upload = req.app.locals.upload;
  upload.single('image')(req, res, (err) => {
    if (err) return next(err);
    next();
  });
}, blogController.updateBlog);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;