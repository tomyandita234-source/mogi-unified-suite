const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contactController")
const { contactRateLimiter } = require("../middleware/rateLimitMiddleware")
const authenticateToken = require("../middleware/authMiddleware")
const authorizeAdmin = require("../middleware/authorizeAdmin")

// Send contact form message (public endpoint)
router.post("/", contactRateLimiter, contactController.sendContactMessage)

// Get all contact messages (admin only)
router.get("/", authenticateToken, authorizeAdmin, contactController.getAllContactMessages)

// Get contact message by ID (admin only)
router.get("/:id", authenticateToken, authorizeAdmin, contactController.getContactMessageById)

// Delete contact message (admin only)
router.delete("/:id", authenticateToken, authorizeAdmin, contactController.deleteContactMessage)

module.exports = router
