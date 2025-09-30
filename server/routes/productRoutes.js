const express = require('express');
const router = express.Router();
const productController = require('../controllers/prisma/productController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all products
router.get('/', productController.getAllProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Get product by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Create new product (protected route) - with image upload
router.post('/', auth, upload.single('image'), productController.createProduct);

// Update product (protected route) - with image upload
router.put('/:id', auth, upload.single('image'), productController.updateProduct);

// Delete product (protected route)
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;