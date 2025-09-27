const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isShow: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    // Handle image upload if present
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    
    const blog = await prisma.blog.create({
      data: req.body
    });
    
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    // Handle image upload if present
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    
    const blog = await prisma.blog.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    await prisma.blog.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};