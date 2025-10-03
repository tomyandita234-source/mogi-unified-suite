const express = require("express")
const router = express.Router()
const careerController = require("../controllers/prisma/careerController")
const auth = require("../middleware/authMiddleware")

// Public routes
router.get("/", careerController.getAllCareers)
router.get("/:id", careerController.getCareerById)

// Protected routes (require authentication)
router.post("/", auth, careerController.createCareer)
router.put("/:id", auth, careerController.updateCareer)
router.delete("/:id", auth, careerController.deleteCareer)

module.exports = router
