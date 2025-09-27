const express = require('express');
const router = express.Router();
const productController = require('../controllers/prisma/productController');
const auth = require('../middleware/authMiddleware');

// Get all products
router.get('/', productController.getAllProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Get product by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Create new product (protected route)
router.post('/', auth, productController.createProduct);

// Update product (protected route)
router.put('/:id', auth, productController.updateProduct);

// Delete product (protected route)
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;