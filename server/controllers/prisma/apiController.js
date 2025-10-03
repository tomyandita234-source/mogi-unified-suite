const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

// Add this line to import the RSS service
const RssService = require("../../services/rssService")

// Generate API key for user
exports.generateApiKey = async (req, res) => {
	try {
		const userId = req.userId

		// Generate a random API key
		const apiKey = "sk_live_" + Math.random().toString(36).substring(2, 32)

		// Hash the API key for storage
		const hashedApiKey = await bcrypt.hash(apiKey, 10)

		// Update user with API key
		const user = await prisma.user.update({
			where: { id: userId },
			data: { apiKey: hashedApiKey },
			select: {
				id: true,
				username: true,
				email: true,
				apiKey: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		res.status(200).json({
			message: "API key generated successfully",
			apiKey: apiKey,
			user: user,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get user's API key info
exports.getApiKeyInfo = async (req, res) => {
	try {
		const userId = req.userId

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				apiKey: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// Return user info without the actual API key
		const userInfo = {
			...user,
			hasApiKey: !!user.apiKey,
		}

		delete userInfo.apiKey

		res.status(200).json({
			user: userInfo,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Revoke API key
exports.revokeApiKey = async (req, res) => {
	try {
		const userId = req.userId

		const user = await prisma.user.update({
			where: { id: userId },
			data: { apiKey: null },
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		res.status(200).json({
			message: "API key revoked successfully",
			user: user,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Validate API key middleware
exports.validateApiKey = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Missing or invalid API key" })
		}

		const apiKey = authHeader.substring(7) // Remove "Bearer " prefix

		// Find user with matching API key
		const users = await prisma.user.findMany({
			where: {
				apiKey: {
					not: null,
				},
			},
		})

		let user = null
		for (const u of users) {
			if (await bcrypt.compare(apiKey, u.apiKey)) {
				user = u
				break
			}
		}

		if (!user) {
			return res.status(401).json({ message: "Invalid API key" })
		}

		req.userId = user.id
		next()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get blog posts via API
exports.getBlogPosts = async (req, res) => {
	try {
		const { limit = 10, offset = 0 } = req.query

		const blogs = await prisma.blog.findMany({
			where: { isShow: true },
			orderBy: { createdAt: "desc" },
			take: parseInt(limit),
			skip: parseInt(offset),
			include: { product: true },
		})

		const total = await prisma.blog.count({
			where: { isShow: true },
		})

		res.status(200).json({
			blogs: blogs,
			total: total,
			limit: parseInt(limit),
			offset: parseInt(offset),
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get products via API
exports.getProducts = async (req, res) => {
	try {
		const { limit = 10, offset = 0 } = req.query

		const products = await prisma.product.findMany({
			where: { isActive: true },
			orderBy: { createdAt: "desc" },
			take: parseInt(limit),
			skip: parseInt(offset),
		})

		const total = await prisma.product.count({
			where: { isActive: true },
		})

		res.status(200).json({
			products: products,
			total: total,
			limit: parseInt(limit),
			offset: parseInt(offset),
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Add this new endpoint for auto blog generation
exports.generateBlogsFromRss = async (req, res) => {
	try {
		const { sources } = req.body

		if (!sources || !Array.isArray(sources)) {
			return res.status(400).json({ message: "Sources array is required" })
		}

		// Process the RSS feeds
		const results = await RssService.processMultipleFeeds(sources)

		res.status(200).json({
			message: "Blog generation completed",
			results: results,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
