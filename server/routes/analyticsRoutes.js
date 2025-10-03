const express = require("express")
const router = express.Router()
const analyticsController = require("../controllers/prisma/analyticsController")
const auth = require("../middleware/authMiddleware")

// Get dashboard statistics
router.get("/dashboard", auth, analyticsController.getDashboardStats)

// Get blog analytics
router.get("/blogs", auth, analyticsController.getBlogAnalytics)

// Get product analytics
router.get("/products", auth, analyticsController.getProductAnalytics)

// Get user analytics
router.get("/users", auth, analyticsController.getUserAnalytics)

module.exports = router
