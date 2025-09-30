const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config")
const xss = require("xss")

const prisma = new PrismaClient()

// Register new user
exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body

		// Sanitize inputs
		const sanitizedUsername = xss(username)
		const sanitizedEmail = xss(email)

		// Validate input
		if (!sanitizedUsername || !sanitizedEmail || !password) {
			return res.status(400).json({ message: "Username, email, and password are required" })
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(sanitizedEmail)) {
			return res.status(400).json({ message: "Invalid email format" })
		}

		// Validate password length
		if (password.length < 6) {
			return res.status(400).json({ message: "Password must be at least 6 characters long" })
		}

		// Check if user already exists
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: sanitizedEmail }, { username: sanitizedUsername }],
			},
		})

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" })
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create new user
		const user = await prisma.user.create({
			data: {
				username: sanitizedUsername,
				email: sanitizedEmail,
				password: hashedPassword,
				role: "user", // Default role
			},
		})

		// Generate JWT token
		const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, config.JWT_SECRET, {
			expiresIn: "1d",
		})

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Login user
exports.login = async (req, res) => {
	try {
		const { username, password } = req.body

		// Sanitize inputs
		const sanitizedUsername = xss(username)

		// Validate input
		if (!sanitizedUsername || !password) {
			return res.status(400).json({ message: "Username and password are required" })
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { username: sanitizedUsername },
		})

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		// Generate JWT token
		const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, config.JWT_SECRET, {
			expiresIn: "1d",
		})

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get user profile
exports.getProfile = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.userId },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
	try {
		// Check if user is admin
		if (req.userRole !== "admin") {
			return res.status(403).json({ message: "Access denied. Admin only." })
		}

		const users = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
			},
			orderBy: { createdAt: "desc" },
		})

		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get user by ID (admin only)
exports.getUserById = async (req, res) => {
	try {
		// Check if user is admin
		if (req.userRole !== "admin") {
			return res.status(403).json({ message: "Access denied. Admin only." })
		}

		const userId = parseInt(req.params.id)
		if (isNaN(userId)) {
			return res.status(400).json({ message: "Invalid user ID" })
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update user (admin can update any user, users can update themselves)
exports.updateUser = async (req, res) => {
	try {
		const userId = parseInt(req.params.id)
		if (isNaN(userId)) {
			return res.status(400).json({ message: "Invalid user ID" })
		}

		// Check permissions - admin can update any user, users can update themselves
		if (req.userId !== userId && req.userRole !== "admin") {
			return res.status(403).json({ message: "Access denied. You can only update your own profile." })
		}

		// Sanitize inputs
		const sanitizedData = {}

		if (req.body.username !== undefined) {
			sanitizedData.username = xss(req.body.username)
		}

		if (req.body.email !== undefined) {
			sanitizedData.email = xss(req.body.email)
			
			// Validate email format if provided
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(sanitizedData.email)) {
				return res.status(400).json({ message: "Invalid email format" })
			}
		}

		if (req.body.role !== undefined && req.userRole === "admin") {
			// Only admin can change roles
			sanitizedData.role = xss(req.body.role)
		}

		if (req.body.isActive !== undefined && req.userRole === "admin") {
			// Only admin can change active status
			sanitizedData.isActive = Boolean(req.body.isActive)
		}

		// Check if username or email already exists (if they're being updated)
		if (sanitizedData.username || sanitizedData.email) {
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [
						sanitizedData.username ? { username: sanitizedData.username } : undefined,
						sanitizedData.email ? { email: sanitizedData.email } : undefined,
					].filter(Boolean),
					NOT: { id: userId },
				},
			})

			if (existingUser) {
				if (existingUser.username === sanitizedData.username) {
					return res.status(400).json({ message: "Username already exists" })
				}
				if (existingUser.email === sanitizedData.email) {
					return res.status(400).json({ message: "Email already exists" })
				}
			}
		}

		// Update user
		const user = await prisma.user.update({
			where: { id: userId },
			data: sanitizedData,
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
	try {
		// Check if user is admin
		if (req.userRole !== "admin") {
			return res.status(403).json({ message: "Access denied. Admin only." })
		}

		const userId = parseInt(req.params.id)
		if (isNaN(userId)) {
			return res.status(400).json({ message: "Invalid user ID" })
		}

		// Prevent deleting the last admin
		const userToDelete = await prisma.user.findUnique({
			where: { id: userId },
		})

		if (!userToDelete) {
			return res.status(404).json({ message: "User not found" })
		}

		if (userToDelete.role === "admin") {
			const adminCount = await prisma.user.count({
				where: { role: "admin" },
			})

			if (adminCount <= 1) {
				return res.status(400).json({ message: "Cannot delete the last admin user" })
			}
		}

		// Delete user
		await prisma.user.delete({
			where: { id: userId },
		})

		res.status(200).json({ message: "User deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}