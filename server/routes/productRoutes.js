const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Get product by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;