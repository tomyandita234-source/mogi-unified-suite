const { PrismaClient } = require("@prisma/client")
const xss = require("xss")

const prisma = new PrismaClient()

// Get all products
exports.getAllProducts = async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			where: { isActive: true },
			orderBy: { sortOrder: "asc" },
		})
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single product by ID
exports.getProductById = async (req, res) => {
	try {
		const product = await prisma.product.findUnique({
			where: { id: parseInt(req.params.id) },
		})

		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}

		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get product by slug
exports.getProductBySlug = async (req, res) => {
	try {
		// Sanitize slug
		const sanitizedSlug = xss(req.params.slug)

		const product = await prisma.product.findFirst({
			where: {
				slug: sanitizedSlug,
				isActive: true,
			},
		})

		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}

		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new product
exports.createProduct = async (req, res) => {
	try {
		// Validate required fields
		if (!req.body.name || !req.body.slug || !req.body.description || !req.body.category) {
			return res.status(400).json({ message: "Name, slug, description, and category are required" })
		}

		// Sanitize inputs
		const sanitizedData = {
			name: xss(req.body.name),
			slug: xss(req.body.slug),
			description: xss(req.body.description),
			longDescription: req.body.longDescription ? xss(req.body.longDescription) : null,
			category: xss(req.body.category),
			features: req.body.features,
			benefits: req.body.benefits,
			pricing: req.body.pricing,
			isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true,
			imageUrl: req.body.imageUrl ? xss(req.body.imageUrl) : null,
			sortOrder: req.body.sortOrder ? parseInt(req.body.sortOrder) : 0,
		}

		// Handle image upload if present
		if (req.file) {
			sanitizedData.imageUrl = `/uploads/${req.file.filename}`
		}

		// Handle JSON fields
		if (sanitizedData.features && Array.isArray(sanitizedData.features)) {
			sanitizedData.features = JSON.stringify(sanitizedData.features)
		}

		if (sanitizedData.benefits && Array.isArray(sanitizedData.benefits)) {
			sanitizedData.benefits = JSON.stringify(sanitizedData.benefits)
		}

		if (sanitizedData.pricing && typeof sanitizedData.pricing === "object") {
			sanitizedData.pricing = JSON.stringify(sanitizedData.pricing)
		}

		const product = await prisma.product.create({
			data: sanitizedData,
		})

		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Update product
exports.updateProduct = async (req, res) => {
	try {
		// Validate product ID
		const productId = parseInt(req.params.id)
		if (isNaN(productId)) {
			return res.status(400).json({ message: "Invalid product ID" })
		}

		// Sanitize inputs
		const sanitizedData = {}

		if (req.body.name !== undefined) {
			sanitizedData.name = xss(req.body.name)
		}

		if (req.body.slug !== undefined) {
			sanitizedData.slug = xss(req.body.slug)
		}

		if (req.body.description !== undefined) {
			sanitizedData.description = xss(req.body.description)
		}

		if (req.body.longDescription !== undefined) {
			sanitizedData.longDescription = xss(req.body.longDescription)
		}

		if (req.body.category !== undefined) {
			sanitizedData.category = xss(req.body.category)
		}

		if (req.body.features !== undefined) {
			sanitizedData.features = req.body.features
		}

		if (req.body.benefits !== undefined) {
			sanitizedData.benefits = req.body.benefits
		}

		if (req.body.pricing !== undefined) {
			sanitizedData.pricing = req.body.pricing
		}

		if (req.body.isActive !== undefined) {
			sanitizedData.isActive = Boolean(req.body.isActive)
		}

		if (req.body.imageUrl !== undefined) {
			sanitizedData.imageUrl = xss(req.body.imageUrl)
		}

		if (req.body.sortOrder !== undefined) {
			sanitizedData.sortOrder = parseInt(req.body.sortOrder)
		}

		// Handle image upload if present
		if (req.file) {
			sanitizedData.imageUrl = `/uploads/${req.file.filename}`
		}

		// Handle JSON fields
		if (sanitizedData.features && Array.isArray(sanitizedData.features)) {
			sanitizedData.features = JSON.stringify(sanitizedData.features)
		}

		if (sanitizedData.benefits && Array.isArray(sanitizedData.benefits)) {
			sanitizedData.benefits = JSON.stringify(sanitizedData.benefits)
		}

		if (sanitizedData.pricing && typeof sanitizedData.pricing === "object") {
			sanitizedData.pricing = JSON.stringify(sanitizedData.pricing)
		}

		const product = await prisma.product.update({
			where: { id: productId },
			data: sanitizedData,
		})

		res.status(200).json(product)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Delete product
exports.deleteProduct = async (req, res) => {
	try {
		// Validate product ID
		const productId = parseInt(req.params.id)
		if (isNaN(productId)) {
			return res.status(400).json({ message: "Invalid product ID" })
		}

		await prisma.product.delete({
			where: { id: productId },
		})

		res.status(200).json({ message: "Product deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get products by category
exports.getProductsByCategory = async (req, res) => {
	try {
		// Sanitize category
		const sanitizedCategory = xss(req.params.category)

		const products = await prisma.product.findMany({
			where: {
				category: sanitizedCategory,
				isActive: true,
			},
			orderBy: { sortOrder: "asc" },
		})
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}