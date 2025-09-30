// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
	// Check if user role is admin
	if (req.userRole !== "admin") {
		return res.status(403).json({ message: "Access denied. Admin privileges required." })
	}
	next()
}

module.exports = authorizeAdmin
