const { PrismaClient } = require("@prisma/client")
const xss = require("xss")

const prisma = new PrismaClient()

// Get all blogs
exports.getAllBlogs = async (req, res) => {
	try {
		const blogs = await prisma.blog.findMany({
			where: { isShow: true },
			orderBy: { createdAt: "desc" },
			include: { product: true }, // Include product data
		})
		res.status(200).json(blogs)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get blogs by product ID
exports.getBlogsByProductId = async (req, res) => {
	try {
		const productId = parseInt(req.params.productId)
		if (isNaN(productId)) {
			return res.status(400).json({ message: "Invalid product ID" })
		}

		const blogs = await prisma.blog.findMany({
			where: {
				AND: [{ isShow: true }, { productId: productId }],
			},
			orderBy: { createdAt: "desc" },
			include: { product: true },
		})
		res.status(200).json(blogs)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single blog by ID
exports.getBlogById = async (req, res) => {
	try {
		const blog = await prisma.blog.findUnique({
			where: { id: parseInt(req.params.id) },
			include: { product: true },
		})

		if (!blog) {
			return res.status(404).json({ message: "Blog not found" })
		}

		res.status(200).json(blog)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new blog
exports.createBlog = async (req, res) => {
	try {
		// Validate required fields
		if (!req.body.title || !req.body.slug || !req.body.body) {
			return res.status(400).json({ message: "Title, slug, and body are required" })
		}

		// Sanitize inputs
		const sanitizedData = {
			title: xss(req.body.title),
			slug: xss(req.body.slug),
			body: xss(req.body.body),
			images_alt: req.body.images_alt ? xss(req.body.images_alt) : "MogiApp Blog Image",
			images_source: req.body.images_source
				? xss(req.body.images_source)
				: "Morfogenesis Teknologi Indonesia Creative Team",
			createdBy: req.body.createdBy ? xss(req.body.createdBy) : "Admin",
			source: req.body.source ? xss(req.body.source) : "Morfogenesis Teknologi Indonesia",
			isShow: req.body.isShow !== undefined ? Boolean(req.body.isShow) : false,
		}

		// Add product ID if provided
		if (req.body.productId) {
			const productId = parseInt(req.body.productId)
			if (!isNaN(productId)) {
				sanitizedData.productId = productId
			}
		}

		// Handle image upload if present
		if (req.file) {
			sanitizedData.image = `/uploads/${req.file.filename}`
		} else if (req.body.image) {
			sanitizedData.image = xss(req.body.image)
		}

		const blog = await prisma.blog.create({
			data: sanitizedData,
			include: { product: true },
		})

		res.status(201).json(blog)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Update blog
exports.updateBlog = async (req, res) => {
	try {
		// Validate blog ID
		const blogId = parseInt(req.params.id)
		if (isNaN(blogId)) {
			return res.status(400).json({ message: "Invalid blog ID" })
		}

		// Sanitize inputs
		const sanitizedData = {}

		if (req.body.title !== undefined) {
			sanitizedData.title = xss(req.body.title)
		}

		if (req.body.slug !== undefined) {
			sanitizedData.slug = xss(req.body.slug)
		}

		if (req.body.body !== undefined) {
			sanitizedData.body = xss(req.body.body)
		}

		if (req.body.images_alt !== undefined) {
			sanitizedData.images_alt = xss(req.body.images_alt)
		}

		if (req.body.images_source !== undefined) {
			sanitizedData.images_source = xss(req.body.images_source)
		}

		if (req.body.createdBy !== undefined) {
			sanitizedData.createdBy = xss(req.body.createdBy)
		}

		if (req.body.source !== undefined) {
			sanitizedData.source = xss(req.body.source)
		}

		if (req.body.isShow !== undefined) {
			sanitizedData.isShow = Boolean(req.body.isShow)
		}

		// Update product ID if provided
		if (req.body.productId !== undefined) {
			if (req.body.productId === null) {
				sanitizedData.productId = null
			} else {
				const productId = parseInt(req.body.productId)
				if (!isNaN(productId)) {
					sanitizedData.productId = productId
				}
			}
		}

		// Handle image upload if present
		if (req.file) {
			sanitizedData.image = `/uploads/${req.file.filename}`
		} else if (req.body.image !== undefined) {
			sanitizedData.image = req.body.image ? xss(req.body.image) : null
		}

		const blog = await prisma.blog.update({
			where: { id: blogId },
			data: sanitizedData,
			include: { product: true },
		})

		res.status(200).json(blog)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Delete blog
exports.deleteBlog = async (req, res) => {
	try {
		// Validate blog ID
		const blogId = parseInt(req.params.id)
		if (isNaN(blogId)) {
			return res.status(400).json({ message: "Invalid blog ID" })
		}

		await prisma.blog.delete({
			where: { id: blogId },
		})

		res.status(200).json({ message: "Blog deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
