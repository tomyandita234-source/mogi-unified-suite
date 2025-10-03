const { PrismaClient } = require("@prisma/client")
const xss = require("xss")

const prisma = new PrismaClient()

// Get all careers
exports.getAllCareers = async (req, res) => {
	try {
		const careers = await prisma.career.findMany({
			where: { isActive: true },
			orderBy: { sortOrder: "asc" },
		})
		res.status(200).json(careers)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single career by ID
exports.getCareerById = async (req, res) => {
	try {
		const career = await prisma.career.findUnique({
			where: { id: parseInt(req.params.id) },
		})

		if (!career) {
			return res.status(404).json({ message: "Career not found" })
		}

		res.status(200).json(career)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new career
exports.createCareer = async (req, res) => {
	try {
		// Validate required fields
		if (!req.body.title || !req.body.department || !req.body.location || !req.body.description) {
			return res.status(400).json({ message: "Title, department, location, and description are required" })
		}

		// Sanitize inputs
		const sanitizedData = {
			title: xss(req.body.title),
			department: xss(req.body.department),
			location: xss(req.body.location),
			type: req.body.type ? xss(req.body.type) : "Full-time",
			experience: xss(req.body.experience),
			description: xss(req.body.description),
			isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true,
			sortOrder: req.body.sortOrder ? parseInt(req.body.sortOrder) : 0,
		}

		// Handle JSON fields
		if (req.body.requirements && Array.isArray(req.body.requirements)) {
			sanitizedData.requirements = JSON.stringify(req.body.requirements)
		} else {
			sanitizedData.requirements = JSON.stringify([])
		}

		const career = await prisma.career.create({
			data: sanitizedData,
		})

		res.status(201).json(career)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Update career
exports.updateCareer = async (req, res) => {
	try {
		// Validate career ID
		const careerId = parseInt(req.params.id)
		if (isNaN(careerId)) {
			return res.status(400).json({ message: "Invalid career ID" })
		}

		// Sanitize inputs
		const sanitizedData = {}

		if (req.body.title !== undefined) {
			sanitizedData.title = xss(req.body.title)
		}

		if (req.body.department !== undefined) {
			sanitizedData.department = xss(req.body.department)
		}

		if (req.body.location !== undefined) {
			sanitizedData.location = xss(req.body.location)
		}

		if (req.body.type !== undefined) {
			sanitizedData.type = xss(req.body.type)
		}

		if (req.body.experience !== undefined) {
			sanitizedData.experience = xss(req.body.experience)
		}

		if (req.body.description !== undefined) {
			sanitizedData.description = xss(req.body.description)
		}

		if (req.body.isActive !== undefined) {
			sanitizedData.isActive = Boolean(req.body.isActive)
		}

		if (req.body.sortOrder !== undefined) {
			sanitizedData.sortOrder = parseInt(req.body.sortOrder)
		}

		// Handle JSON fields
		if (req.body.requirements !== undefined) {
			if (Array.isArray(req.body.requirements)) {
				sanitizedData.requirements = JSON.stringify(req.body.requirements)
			} else {
				sanitizedData.requirements = JSON.stringify([])
			}
		}

		const career = await prisma.career.update({
			where: { id: careerId },
			data: sanitizedData,
		})

		res.status(200).json(career)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Delete career
exports.deleteCareer = async (req, res) => {
	try {
		// Validate career ID
		const careerId = parseInt(req.params.id)
		if (isNaN(careerId)) {
			return res.status(400).json({ message: "Invalid career ID" })
		}

		await prisma.career.delete({
			where: { id: careerId },
		})

		res.status(200).json({ message: "Career deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
