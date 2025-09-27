const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: { 
        slug: req.params.slug, 
        isActive: true 
      }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    // Handle JSON fields
    if (req.body.features && Array.isArray(req.body.features)) {
      req.body.features = JSON.stringify(req.body.features);
    }
    
    if (req.body.benefits && Array.isArray(req.body.benefits)) {
      req.body.benefits = JSON.stringify(req.body.benefits);
    }
    
    if (req.body.pricing && typeof req.body.pricing === 'object') {
      req.body.pricing = JSON.stringify(req.body.pricing);
    }
    
    const product = await prisma.product.create({
      data: req.body
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    // Handle JSON fields
    if (req.body.features && Array.isArray(req.body.features)) {
      req.body.features = JSON.stringify(req.body.features);
    }
    
    if (req.body.benefits && Array.isArray(req.body.benefits)) {
      req.body.benefits = JSON.stringify(req.body.benefits);
    }
    
    if (req.body.pricing && typeof req.body.pricing === 'object') {
      req.body.pricing = JSON.stringify(req.body.pricing);
    }
    
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await prisma.product.findMany({
      where: { 
        category, 
        isActive: true 
      },
      orderBy: { sortOrder: 'asc' }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};