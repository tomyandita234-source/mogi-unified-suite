const helmet = require("helmet")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")

// Security middleware
const securityMiddleware = (app) => {
	// Set security headers
	app.use(helmet())

	// Prevent XSS attacks
	app.use(xss())

	// Sanitize data to prevent MongoDB operator injection
	app.use(mongoSanitize())
}

module.exports = securityMiddleware
