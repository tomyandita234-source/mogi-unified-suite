const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
	try {
		// Get counts
		const totalBlogs = await prisma.blog.count()
		const totalProducts = await prisma.product.count()
		const totalContacts = await prisma.contact.count()

		// Get unread contacts (last 7 days)
		const unreadContacts = await prisma.contact.count({
			where: {
				createdAt: {
					gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				},
			},
		})

		// Get recent blogs (last 30 days)
		const recentBlogs = await prisma.blog.count({
			where: {
				createdAt: {
					gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				},
			},
		})

		// Get active products
		const activeProducts = await prisma.product.count({
			where: {
				isActive: true,
			},
		})

		// Get user count
		const totalUsers = await prisma.user.count()

		// Get recent users (last 30 days)
		const recentUsers = await prisma.user.count({
			where: {
				createdAt: {
					gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				},
			},
		})

		res.status(200).json({
			stats: {
				totalBlogs,
				totalProducts,
				totalContacts,
				unreadContacts,
				recentBlogs,
				activeProducts,
				totalUsers,
				recentUsers,
			},
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get blog analytics
exports.getBlogAnalytics = async (req, res) => {
	try {
		// Get most viewed blogs (we'll simulate this with recent blogs)
		const mostViewedBlogs = await prisma.blog.findMany({
			take: 5,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				product: true,
			},
		})

		// Get blog count by product
		const blogsByProduct = await prisma.blog.groupBy({
			by: ["productId"],
			_count: {
				_id: true,
			},
		})

		// Get blog count by date (last 30 days)
		const blogCountByDate = await prisma.blog.groupBy({
			by: ["createdAt"],
			where: {
				createdAt: {
					gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		})

		res.status(200).json({
			mostViewedBlogs,
			blogsByProduct,
			blogCountByDate,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get product analytics
exports.getProductAnalytics = async (req, res) => {
	try {
		// Get most viewed products (we'll simulate this with recent products)
		const mostViewedProducts = await prisma.product.findMany({
			take: 5,
			orderBy: {
				createdAt: "desc",
			},
		})

		// Get product count by category
		const productsByCategory = await prisma.product.groupBy({
			by: ["category"],
			_count: {
				_id: true,
			},
		})

		res.status(200).json({
			mostViewedProducts,
			productsByCategory,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get user analytics
exports.getUserAnalytics = async (req, res) => {
	try {
		// Get user count by role
		const usersByRole = await prisma.user.groupBy({
			by: ["role"],
			_count: {
				_id: true,
			},
		})

		// Get recent users
		const recentUsers = await prisma.user.findMany({
			take: 5,
			orderBy: {
				createdAt: "desc",
			},
		})

		res.status(200).json({
			usersByRole,
			recentUsers,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
