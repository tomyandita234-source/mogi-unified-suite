const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function resetAdminPassword() {
	try {
		// Hash the new password
		const newPassword = "admin123"
		const hashedPassword = await bcrypt.hash(newPassword, 10)

		// Update the admin user's password
		const updatedUser = await prisma.user.update({
			where: { username: "admin" },
			data: { password: hashedPassword },
		})

		console.log("✅ Admin password reset successfully")
		console.log("Username: admin")
		console.log("Password: admin123")
	} catch (error) {
		console.error("Error resetting password:", error)
	} finally {
		await prisma.$disconnect()
	}
}

resetAdminPassword()
