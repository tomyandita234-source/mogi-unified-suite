const express = require("express")
const router = express.Router()
const apiController = require("../controllers/prisma/apiController")
const auth = require("../middleware/authMiddleware")

// Generate API key
router.post("/generate-key", auth, apiController.generateApiKey)

// Get API key info
router.get("/key-info", auth, apiController.getApiKeyInfo)

// Revoke API key
router.delete("/revoke-key", auth, apiController.revokeApiKey)

// Auto blog generation
router.post("/generate-blogs", auth, apiController.generateBlogsFromRss)

// Public API endpoints (protected by API key)
router.get("/blogs", apiController.validateApiKey, apiController.getBlogPosts)
router.get("/products", apiController.validateApiKey, apiController.getProducts)

module.exports = router
