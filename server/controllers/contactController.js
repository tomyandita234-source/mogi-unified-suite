const nodemailer = require("nodemailer")
const xss = require("xss")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	port: process.env.SMTP_PORT || 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER || "your-email@gmail.com",
		pass: process.env.EMAIL_PASS || "your-app-password",
	},
})

// Send contact form message
exports.sendContactMessage = async (req, res) => {
	try {
		const { name, email, phone, message } = req.body

		// Sanitize inputs
		const sanitizedName = xss(name)
		const sanitizedEmail = xss(email)
		const sanitizedPhone = phone ? xss(phone) : ""
		const sanitizedMessage = xss(message)

		// Validate required fields
		if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
			return res.status(400).json({
				success: false,
				message: "Nama, email, dan pesan harus diisi",
			})
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(sanitizedEmail)) {
			return res.status(400).json({
				success: false,
				message: "Format email tidak valid",
			})
		}

		// Save to database using Prisma
		const contact = await prisma.contact.create({
			data: {
				name: sanitizedName,
				email: sanitizedEmail,
				phone: sanitizedPhone,
				message: sanitizedMessage,
			},
		})

		// Send email notification
		const mailOptions = {
			from: sanitizedEmail,
			to: process.env.CONTACT_EMAIL || "info@morfotech.id", // Recipient email
			subject: `Pesan Kontak dari ${sanitizedName}`,
			text: `
        Anda telah menerima pesan dari form kontak:
        
        Nama: ${sanitizedName}
        Email: ${sanitizedEmail}
        Telepon: ${sanitizedPhone || "Tidak disediakan"}
        
        Pesan:
        ${sanitizedMessage}
      `,
			html: `
        <h2>Pesan Kontak Baru</h2>
        <p><strong>Nama:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Telepon:</strong> ${sanitizedPhone || "Tidak disediakan"}</p>
        <p><strong>Pesan:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
      `,
		}

		// Send email if SMTP is configured
		if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
			await transporter.sendMail(mailOptions)
		}

		res.status(200).json({
			success: true,
			message: "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
		})
	} catch (error) {
		console.error("Error sending contact message:", error)
		res.status(500).json({
			success: false,
			message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
		})
	}
}

// Get all contact messages (for admin panel)
exports.getAllContactMessages = async (req, res) => {
	try {
		const contacts = await prisma.contact.findMany({
			orderBy: {
				createdAt: "desc",
			},
		})
		res.status(200).json(contacts)
	} catch (error) {
		console.error("Error fetching contact messages:", error)
		res.status(500).json({
			success: false,
			message: "Gagal mengambil pesan kontak. Silakan coba lagi nanti.",
		})
	}
}

// Get contact message by ID (for admin panel)
exports.getContactMessageById = async (req, res) => {
	try {
		const { id } = req.params
		const contact = await prisma.contact.findUnique({
			where: {
				id: parseInt(id),
			},
		})

		if (!contact) {
			return res.status(404).json({
				success: false,
				message: "Pesan kontak tidak ditemukan.",
			})
		}

		res.status(200).json(contact)
	} catch (error) {
		console.error("Error fetching contact message:", error)
		res.status(500).json({
			success: false,
			message: "Gagal mengambil pesan kontak. Silakan coba lagi nanti.",
		})
	}
}

// Delete contact message (for admin panel)
exports.deleteContactMessage = async (req, res) => {
	try {
		const { id } = req.params
		const contact = await prisma.contact.delete({
			where: {
				id: parseInt(id),
			},
		})

		res.status(200).json({
			success: true,
			message: "Pesan kontak berhasil dihapus.",
		})
	} catch (error) {
		console.error("Error deleting contact message:", error)
		res.status(500).json({
			success: false,
			message: "Gagal menghapus pesan kontak. Silakan coba lagi nanti.",
		})
	}
}
