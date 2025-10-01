const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Create sample blog posts
router.post("/create-sample-blogs", async (req, res) => {
	try {
		console.log("🚀 Creating sample blog posts for products...")

		// Get all products
		const products = await prisma.product.findMany()
		console.log(`Found ${products.length} products`)

		if (products.length === 0) {
			return res
				.status(400)
				.json({ message: "No products found in database. Please initialize the database first." })
		}

		// Check if sample blogs already exist
		const existingBlogs = await prisma.blog.count()
		if (existingBlogs >= 24) {
			// 3 blogs per 8 products = 24
			return res.status(200).json({ message: "Sufficient sample blog posts already exist" })
		}

		// Sample blog posts for each product
		const blogPosts = [
			// Mogi POS Blog Posts
			{
				title: "5 Tips to Maximize Your Retail Sales with Mogi POS",
				slug: "5-tips-maximize-retail-sales-mogi-pos",
				body: "Mogi POS is more than just a point of sale system - it's a complete retail solution designed to help you maximize your sales and streamline operations. In this article, we'll share 5 essential tips to get the most out of your Mogi POS system.",
				image: "",
				images_alt: "Mogi POS Interface",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-pos",
			},
			{
				title: "How Real-Time Inventory Management Can Transform Your Business",
				slug: "real-time-inventory-management-transform-business",
				body: "Real-time inventory management is a game-changer for retail businesses. With Mogi POS, you can track your inventory levels, sales, and reorder points in real-time, ensuring you never run out of stock or overstock items.",
				image: "",
				images_alt: "Inventory Management Dashboard",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-pos",
			},
			{
				title: "The Future of Retail: Trends to Watch in 2025",
				slug: "future-retail-trends-2025",
				body: "The retail landscape is constantly evolving, and staying ahead of the curve is crucial for success. In this article, we explore the key trends that will shape the future of retail in 2025 and beyond, and how Mogi POS can help you adapt.",
				image: "",
				images_alt: "Future of Retail",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-pos",
			},

			// MogiPay Blog Posts
			{
				title: "Why Digital Payments Are Essential for Modern Businesses",
				slug: "digital-payments-essential-modern-businesses",
				body: "Digital payments have become a necessity for businesses looking to stay competitive in today's market. With MogiPay, you can accept payments from multiple channels, reduce transaction costs, and improve customer satisfaction.",
				image: "",
				images_alt: "Digital Payments",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogipay",
			},
			{
				title: "Security Best Practices for Payment Processing",
				slug: "security-best-practices-payment-processing",
				body: "Security is paramount when it comes to payment processing. MogiPay implements industry-leading security measures to protect your business and customers. Learn about the best practices you should follow to ensure secure transactions.",
				image: "",
				images_alt: "Payment Security",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogipay",
			},
			{
				title: "How to Reduce Payment Processing Fees",
				slug: "reduce-payment-processing-fees",
				body: "Payment processing fees can eat into your profit margins. With MogiPay's competitive pricing and transparent fee structure, you can significantly reduce your payment processing costs while maintaining high-quality service.",
				image: "",
				images_alt: "Payment Processing Fees",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogipay",
			},

			// Mogi Ops Blog Posts
			{
				title: "Boosting Team Productivity with Mogi Ops",
				slug: "boosting-team-productivity-mogi-ops",
				body: "Team productivity is the key to business success. Mogi Ops provides powerful tools to help you manage tasks, track progress, and optimize workflows, resulting in a more efficient and productive team.",
				image: "",
				images_alt: "Team Productivity",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-ops",
			},
			{
				title: "Project Management Best Practices for Remote Teams",
				slug: "project-management-best-practices-remote-teams",
				body: "Managing remote teams presents unique challenges. Mogi Ops offers features specifically designed to help you manage distributed teams effectively, ensuring everyone stays aligned and productive regardless of location.",
				image: "",
				images_alt: "Remote Team Management",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-ops",
			},
			{
				title: "How to Measure and Improve Operational Efficiency",
				slug: "measure-improve-operational-efficiency",
				body: "Operational efficiency directly impacts your bottom line. With Mogi Ops, you can track key performance indicators, identify bottlenecks, and implement improvements to streamline your operations and reduce costs.",
				image: "",
				images_alt: "Operational Efficiency",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-ops",
			},

			// Mogi Fleet Blog Posts
			{
				title: "Optimizing Delivery Routes to Save Time and Fuel",
				slug: "optimizing-delivery-routes-save-time-fuel",
				body: "Route optimization is crucial for fleet management efficiency. Mogi Fleet's advanced routing algorithms help you minimize travel time and fuel consumption while ensuring timely deliveries to your customers.",
				image: "",
				images_alt: "Route Optimization",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-fleet",
			},
			{
				title: "Vehicle Maintenance Best Practices for Fleet Managers",
				slug: "vehicle-maintenance-best-practices-fleet-managers",
				body: "Proper vehicle maintenance is essential for fleet safety and cost control. Mogi Fleet helps you schedule preventive maintenance, track repair history, and monitor vehicle performance to keep your fleet running smoothly.",
				image: "",
				images_alt: "Vehicle Maintenance",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-fleet",
			},
			{
				title: "How GPS Tracking Improves Fleet Safety and Accountability",
				slug: "gps-tracking-improves-fleet-safety-accountability",
				body: "GPS tracking technology provides valuable insights into driver behavior, vehicle location, and route adherence. Mogi Fleet's real-time tracking helps you improve safety, reduce liability, and enhance accountability across your fleet.",
				image: "",
				images_alt: "GPS Tracking",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-fleet",
			},

			// MogiSign Blog Posts
			{
				title: "The Legal Validity of Digital Signatures in Indonesia",
				slug: "legal-validity-digital-signatures-indonesia",
				body: "Digital signatures are legally binding in Indonesia under UU ITE. MogiSign ensures compliance with all legal requirements, providing you with a secure and legally valid electronic signature solution.",
				image: "",
				images_alt: "Digital Signatures Legal",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogisign",
			},
			{
				title: "How to Digitize Your Document Workflow",
				slug: "digitize-document-workflow",
				body: "Going paperless can transform your business operations. MogiSign helps you digitize your document workflow, from creation to signing to storage, reducing costs and improving efficiency.",
				image: "",
				images_alt: "Document Workflow",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogisign",
			},
			{
				title: "Security Features of MogiSign Digital Signatures",
				slug: "security-features-mogisign-digital-signatures",
				body: "Security is at the core of MogiSign's digital signature solution. Learn about the advanced security features that protect your documents and ensure the integrity of your signed agreements.",
				image: "",
				images_alt: "Digital Signature Security",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogisign",
			},

			// Mogi Library Blog Posts
			{
				title: "Digital Transformation in Library Management",
				slug: "digital-transformation-library-management",
				body: "Libraries are evolving to meet the needs of modern users. Mogi Library provides the tools to digitize collections, streamline operations, and enhance the user experience in the digital age.",
				image: "",
				images_alt: "Library Digital Transformation",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-library",
			},
			{
				title: "Improving User Engagement with Library Services",
				slug: "improving-user-engagement-library-services",
				body: "User engagement is key to a successful library. Mogi Library offers features to help you understand user needs, personalize services, and create a more engaging library experience.",
				image: "",
				images_alt: "Library User Engagement",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-library",
			},
			{
				title: "Managing Digital Collections Effectively",
				slug: "managing-digital-collections-effectively",
				body: "Digital collections require specialized management approaches. Mogi Library helps you organize, preserve, and provide access to digital materials while ensuring long-term preservation and accessibility.",
				image: "",
				images_alt: "Digital Collections Management",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-library",
			},

			// Mogi Kampuz Blog Posts
			{
				title: "Streamlining Campus Administration with Mogi Kampuz",
				slug: "streamlining-campus-administration-mogi-kampuz",
				body: "Campus administration involves complex processes that can be streamlined with the right tools. Mogi Kampuz integrates all administrative functions into a single platform, reducing paperwork and improving efficiency.",
				image: "",
				images_alt: "Campus Administration",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-kampuz",
			},
			{
				title: "Enhancing Student Experience Through Technology",
				slug: "enhancing-student-experience-technology",
				body: "Technology plays a crucial role in enhancing the student experience. Mogi Kampuz provides students with easy access to academic information, services, and resources through a user-friendly portal.",
				image: "",
				images_alt: "Student Experience Technology",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-kampuz",
			},
			{
				title: "Data-Driven Decision Making in Higher Education",
				slug: "data-driven-decision-making-higher-education",
				body: "Data analytics can transform how educational institutions make decisions. Mogi Kampuz provides comprehensive reporting and analytics tools to help administrators make informed decisions based on real-time data.",
				image: "",
				images_alt: "Data Analytics in Education",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-kampuz",
			},

			// Mogi Dynamics Blog Posts
			{
				title: "Building Stronger Customer Relationships with CRM",
				slug: "building-stronger-customer-relationships-crm",
				body: "Customer relationship management is essential for business growth. Mogi Dynamics helps you understand your customers better, personalize interactions, and build lasting relationships that drive loyalty and sales.",
				image: "",
				images_alt: "Customer Relationship Management",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-dynamics",
			},
			{
				title: "Marketing Automation Best Practices",
				slug: "marketing-automation-best-practices",
				body: "Marketing automation can save time and improve results when done correctly. Mogi Dynamics offers powerful automation tools to help you nurture leads, personalize communications, and measure campaign effectiveness.",
				image: "",
				images_alt: "Marketing Automation",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-dynamics",
			},
			{
				title: "Understanding Customer Behavior Through Analytics",
				slug: "understanding-customer-behavior-analytics",
				body: "Customer analytics provide valuable insights into buying patterns, preferences, and behavior. Mogi Dynamics helps you collect, analyze, and act on customer data to improve your marketing and sales strategies.",
				image: "",
				images_alt: "Customer Analytics",
				images_source: "Morfogenesis Teknologi Indonesia Creative Team",
				createdBy: "Admin",
				source: "Morfogenesis Teknologi Indonesia",
				isShow: true,
				productSlug: "mogi-dynamics",
			},
		]

		// Create blog posts
		let createdCount = 0
		for (const blogPost of blogPosts) {
			// Find the product by slug
			const product = products.find((p) => p.slug === blogPost.productSlug)

			if (product) {
				// Check if this blog post already exists
				const existingBlog = await prisma.blog.findUnique({
					where: {
						slug: blogPost.slug,
					},
				})

				if (!existingBlog) {
					const createdBlog = await prisma.blog.create({
						data: {
							title: blogPost.title,
							slug: blogPost.slug,
							body: blogPost.body,
							image: blogPost.image,
							images_alt: blogPost.images_alt,
							images_source: blogPost.images_source,
							createdBy: blogPost.createdBy,
							source: blogPost.source,
							isShow: blogPost.isShow,
							productId: product.id,
						},
					})
					console.log(`✅ Created blog post: ${createdBlog.title} for product: ${product.name}`)
					createdCount++
				} else {
					console.log(`ℹ️  Blog post already exists: ${blogPost.title}`)
				}
			} else {
				console.log(`⚠️  Product not found for blog post: ${blogPost.title}`)
			}
		}

		console.log(`🎉 Sample blog posts creation completed! Created ${createdCount} new blog posts.`)
		res.status(200).json({
			message: `Sample blog posts creation completed! Created ${createdCount} new blog posts.`,
		})
	} catch (error) {
		console.error("Error creating sample blog posts:", error)
		res.status(500).json({ message: "Error creating sample blog posts", error: error.message })
	}
})

module.exports = router
