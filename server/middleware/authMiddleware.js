const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = (req, res, next) => {
	try {
		// Get token from header
		const authHeader = req.header("Authorization")

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "No token, authorization denied" })
		}

		const token = authHeader.replace("Bearer ", "")

		// Verify token
		const decoded = jwt.verify(token, config.JWT_SECRET)

		// Check token expiration
		if (decoded.exp <= Date.now() / 1000) {
			return res.status(401).json({ message: "Token has expired" })
		}

		// Add user from payload
		req.userId = decoded.id
		req.userRole = decoded.role

		next()
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" })
		}
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Token has expired" })
		}
		res.status(401).json({ message: "Token is not valid" })
	}
}
