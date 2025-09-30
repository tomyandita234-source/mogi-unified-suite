const rateLimit = require("express-rate-limit")

// Rate limiter for contact form - 5 requests per hour per IP
const contactRateLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // limit each IP to 5 requests per windowMs
	message: {
		success: false,
		message: "Terlalu banyak permintaan dari IP ini. Silakan coba lagi dalam 1 jam.",
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = {
	contactRateLimiter,
}
