const Parser = require("rss-parser")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const parser = new Parser()

class RssService {
	/**
	 * Fetch and parse RSS feed
	 * @param {string} url - RSS feed URL
	 * @returns {Promise<Object>} Parsed feed data
	 */
	static async fetchFeed(url) {
		try {
			const feed = await parser.parseURL(url)
			return feed
		} catch (error) {
			throw new Error(`Failed to fetch RSS feed: ${error.message}`)
		}
	}

	/**
	 * Convert RSS item to blog post format
	 * @param {Object} item - RSS item
	 * @param {string} sourceName - Name of the RSS source
	 * @returns {Object} Blog post data
	 */
	static convertToBlogPost(item, sourceName) {
		// Generate a slug from the title
		const slug = item.title
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "")

		return {
			title: item.title,
			slug: slug,
			body: item["content:encoded"] || item.content || item.summary || "",
			isShow: true,
			source: sourceName,
			externalUrl: item.link,
			publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
			imageUrl: this.extractImageFromContent(item),
		}
	}

	/**
	 * Extract image URL from RSS item content
	 * @param {Object} item - RSS item
	 * @returns {string|null} Image URL or null
	 */
	static extractImageFromContent(item) {
		// Check for media:content or media:thumbnail
		if (item.media && item.media.content && item.media.content.length > 0) {
			return item.media.content[0].url
		}

		if (item.media && item.media.thumbnail && item.media.thumbnail.length > 0) {
			return item.media.thumbnail[0].url
		}

		// Try to extract from content/summary
		const content = item["content:encoded"] || item.content || item.summary || ""
		const imgRegex = /<img[^>]+src=["']([^"']+)["']/i
		const match = content.match(imgRegex)

		return match ? match[1] : null
	}

	/**
	 * Create or update blog post in database
	 * @param {Object} blogData - Blog post data
	 * @returns {Promise<Object>} Created or updated blog post
	 */
	static async createOrUpdateBlogPost(blogData) {
		try {
			// Check if blog post with same external URL already exists
			const existingPost = await prisma.blog.findFirst({
				where: {
					externalUrl: blogData.externalUrl,
				},
			})

			if (existingPost) {
				// Update existing post
				return await prisma.blog.update({
					where: { id: existingPost.id },
					data: {
						title: blogData.title,
						body: blogData.body,
						updatedAt: new Date(),
					},
				})
			} else {
				// Create new post
				return await prisma.blog.create({
					data: {
						title: blogData.title,
						slug: blogData.slug,
						body: blogData.body,
						isShow: blogData.isShow,
						source: blogData.source,
						externalUrl: blogData.externalUrl,
						publishedAt: blogData.publishedAt,
						imageUrl: blogData.imageUrl,
					},
				})
			}
		} catch (error) {
			throw new Error(`Failed to save blog post: ${error.message}`)
		}
	}

	/**
	 * Process RSS feed and generate blog posts
	 * @param {string} url - RSS feed URL
	 * @param {string} sourceName - Name of the RSS source
	 * @param {number} limit - Maximum number of items to process
	 * @returns {Promise<Array>} Array of created/updated blog posts
	 */
	static async processRssFeed(url, sourceName, limit = 10) {
		try {
			const feed = await this.fetchFeed(url)
			const items = feed.items.slice(0, limit)
			const results = []

			for (const item of items) {
				try {
					const blogData = this.convertToBlogPost(item, sourceName)
					const blogPost = await this.createOrUpdateBlogPost(blogData)
					results.push(blogPost)
				} catch (error) {
					console.error(`Error processing RSS item: ${error.message}`)
					// Continue with next item
				}
			}

			return results
		} catch (error) {
			throw new Error(`Failed to process RSS feed: ${error.message}`)
		}
	}

	/**
	 * Process multiple RSS feeds
	 * @param {Array} feeds - Array of feed objects with url and name
	 * @returns {Promise<Object>} Processing results
	 */
	static async processMultipleFeeds(feeds) {
		const results = {
			totalProcessed: 0,
			successful: 0,
			failed: 0,
			errors: [],
			posts: [],
		}

		for (const feed of feeds) {
			if (!feed.active) continue

			try {
				const posts = await this.processRssFeed(feed.url, feed.name)
				results.totalProcessed += posts.length
				results.successful += posts.length
				results.posts.push(...posts)
			} catch (error) {
				results.failed += 1
				results.errors.push({
					feed: feed.name,
					error: error.message,
				})
				console.error(`Error processing feed ${feed.name}: ${error.message}`)
			}
		}

		return results
	}
}

module.exports = RssService
