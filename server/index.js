const express = require("express")
const cors = require("cors")
const blogRoutes = require("./routes/blogRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const contactRoutes = require("./routes/contactRoutes")
const securityMiddleware = require("./middleware/securityMiddleware")
const errorHandler = require("./middleware/errorHandler")

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
securityMiddleware(app)

// CORS configuration
const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true,
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use("/uploads", express.static("uploads"))

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "OK", timestamp: new Date().toISOString() })
})

// Routes
app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/contact", contactRoutes)

// Error handling middleware (should be last middleware)
app.use(errorHandler)

// Root endpoint
app.get("/", (req, res) => {
	res.json({ message: "MogiApp Unified Suite API Server" })
})

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is running on port ${PORT}`)
})

module.exports = app