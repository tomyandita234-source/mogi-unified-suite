const errorHandler = (err, req, res, next) => {
	// Log error for debugging
	console.error("Error occurred:", err)

	// Default error status and message
	let statusCode = 500
	let message = "Internal Server Error"

	// Handle specific error types
	if (err.name === "ValidationError") {
		statusCode = 400
		message = Object.values(err.errors).map((val) => val.message)[0] || "Validation Error"
	} else if (err.name === "CastError") {
		statusCode = 400
		message = "Invalid ID format"
	} else if (err.code === 11000) {
		statusCode = 400
		message = "Duplicate field value entered"
	} else if (err.name === "JsonWebTokenError") {
		statusCode = 401
		message = "Invalid token"
	} else if (err.name === "TokenExpiredError") {
		statusCode = 401
		message = "Token expired"
	} else if (err.message) {
		message = err.message
	}

	// Send error response
	res.status(statusCode).json({
		success: false,
		error: message,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	})
}

module.exports = errorHandler