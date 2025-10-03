const cron = require("node-cron")
const RssService = require("./rssService")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class ScheduledTasks {
	/**
	 * Initialize all scheduled tasks
	 */
	static init() {
		// Run daily at 2:00 AM to generate blogs from RSS feeds
		cron.schedule("0 2 * * *", async () => {
			console.log("Running daily RSS blog generation task...")
			await this.runDailyBlogGeneration()
		})

		// Run weekly on Sunday at 3:00 AM to clean up old data
		cron.schedule("0 3 * * 0", async () => {
			console.log("Running weekly cleanup task...")
			await this.runWeeklyCleanup()
		})

		console.log("Scheduled tasks initialized")
	}

	/**
	 * Run daily blog generation from RSS feeds
	 */
	static async runDailyBlogGeneration() {
		try {
			// Get active RSS sources from database
			// For now, we'll use a predefined list of sources
			const sources = [
				{
					name: "TechCrunch",
					url: "https://techcrunch.com/feed/",
					active: true,
				},
				{
					name: "The Verge",
					url: "https://www.theverge.com/rss/index.xml",
					active: true,
				},
				{
					name: "Mogi Blog",
					url: "https://mogiapp.com/blog/feed/",
					active: true,
				},
			]

			// Process the RSS feeds
			const results = await RssService.processMultipleFeeds(sources)

			console.log(`Daily blog generation completed: ${results.successful} posts generated`)

			// Log the results to database
			await prisma.taskLog.create({
				data: {
					taskName: "Daily RSS Blog Generation",
					status: "SUCCESS",
					details: JSON.stringify({
						totalProcessed: results.totalProcessed,
						successful: results.successful,
						failed: results.failed,
						errors: results.errors,
					}),
				},
			})
		} catch (error) {
			console.error("Error in daily blog generation:", error)

			// Log the error to database
			await prisma.taskLog.create({
				data: {
					taskName: "Daily RSS Blog Generation",
					status: "ERROR",
					details: error.message,
				},
			})
		}
	}

	/**
	 * Run weekly cleanup tasks
	 */
	static async runWeeklyCleanup() {
		try {
			// Clean up old task logs (older than 30 days)
			const thirtyDaysAgo = new Date()
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

			const deletedLogs = await prisma.taskLog.deleteMany({
				where: {
					createdAt: {
						lt: thirtyDaysAgo,
					},
				},
			})

			console.log(`Weekly cleanup completed: ${deletedLogs.count} old task logs deleted`)

			// Log the results to database
			await prisma.taskLog.create({
				data: {
					taskName: "Weekly Cleanup",
					status: "SUCCESS",
					details: JSON.stringify({
						deletedTaskLogs: deletedLogs.count,
					}),
				},
			})
		} catch (error) {
			console.error("Error in weekly cleanup:", error)

			// Log the error to database
			await prisma.taskLog.create({
				data: {
					taskName: "Weekly Cleanup",
					status: "ERROR",
					details: error.message,
				},
			})
		}
	}
}

module.exports = ScheduledTasks
