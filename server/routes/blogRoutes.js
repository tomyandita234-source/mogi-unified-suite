const express = require("express")
const router = express.Router()
const blogController = require("../controllers/prisma/blogController")
const auth = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")

// Get all blogs
router.get("/", blogController.getAllBlogs)

// Get blogs by product ID
router.get("/product/:productId", blogController.getBlogsByProductId)

// Get single blog by ID
router.get("/:id", blogController.getBlogById)

// Create new blog (protected route) - with image upload
router.post("/", auth, upload.single("image"), blogController.createBlog)

// Update blog (protected route) - with image upload
router.put("/:id", auth, upload.single("image"), blogController.updateBlog)

// Delete blog (protected route)
router.delete("/:id", auth, blogController.deleteBlog)

module.exports = router
