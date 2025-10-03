import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogAPI, Blog } from "@/lib/api"

// Mock data fallback
const mockBlogs: Blog[] = [
	{
		_id: "1",
		title: "Revolusi Digital dalam Manajemen Bisnis Modern",
		slug: "revolusi-digital-dalam-manajemen-bisnis-modern",
		body: "Perkembangan teknologi digital telah mengubah cara perusahaan mengelola operasional mereka. Dari sistem POS hingga manajemen armada, semua kini terintegrasi dalam satu platform.",
		image: "/placeholder.svg",
		images_alt: "Revolusi Digital",
		images_source: "MogiApp",
		createdBy: "Tim MogiApp",
		source: "MogiApp",
		isShow: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "2",
		title: "Mengoptimalkan Efisiensi Operasional dengan Teknologi Cloud",
		slug: "mengoptimalkan-efisiensi-operasional-dengan-teknologi-cloud",
		body: "Cloud computing memberikan fleksibilitas dan skalabilitas yang dibutuhkan bisnis modern. Pelajari bagaimana teknologi cloud dapat meningkatkan produktivitas tim Anda.",
		image: "/placeholder.svg",
		images_alt: "Teknologi Cloud",
		images_source: "MogiApp",
		createdBy: "Tim MogiApp",
		source: "MogiApp",
		isShow: true,
		createdAt: new Date(Date.now() - 86400000).toISOString(),
		updatedAt: new Date(Date.now() - 86400000).toISOString(),
	},
	{
		_id: "3",
		title: "Tren Terbaru dalam Sistem Point of Sale (POS)",
		slug: "tren-terbaru-dalam-sistem-point-of-sale-pos",
		body: "Sistem POS modern tidak hanya mencatat transaksi, tetapi juga memberikan insights bisnis yang valuable. Temukan fitur-fitur terbaru yang dapat meningkatkan penjualan Anda.",
		image: "/placeholder.svg",
		images_alt: "Sistem POS",
		images_source: "MogiApp",
		createdBy: "Tim MogiApp",
		source: "MogiApp",
		isShow: true,
		createdAt: new Date(Date.now() - 172800000).toISOString(),
		updatedAt: new Date(Date.now() - 172800000).toISOString(),
	},
]

const BlogSection = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setLoading(true)
				setError(null)
				const data = await BlogAPI.getAll()
				// Sort by updatedAt descending (last updated first) and limit to 6
				const sortedBlogs = data
					.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
					.slice(0, 6)
				setBlogs(sortedBlogs)
			} catch (err) {
				console.error("Error fetching blogs:", err)
				// Use mock data as fallback
				setBlogs(mockBlogs)
				setError(null) // Don't show error to user, just use fallback
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [])

	const handleImageError = (blogId: string) => {
		setImageErrors((prev) => new Set(prev).add(blogId))
	}

	const handleImageLoad = (blogId: string) => {
		setImageErrors((prev) => {
			const newSet = new Set(prev)
			newSet.delete(blogId)
			return newSet
		})
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	}

	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text
		return text.substr(0, maxLength) + "..."
	}

	return (
		<section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
			<div className="container-width">
				{/* Section Header */}
				<div className="section-header">
					<h2 className="section-title">Artikel & Insights Terbaru</h2>
					<p className="section-subtitle">
						Dapatkan tips, tren industri, dan panduan praktis untuk mengoptimalkan bisnis Anda
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				) : error ? (
					<div className="text-center py-20">
						<p className="text-muted-foreground">{error}</p>
					</div>
				) : (
					<>
						{/* Blog Grid - Limited to 6 items */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
							{blogs.slice(0, 6).map((blog) => {
								const blogId = blog._id // Handle both API and mock data
								return (
									<div key={blogId} className="base-card overflow-hidden">
										{/* Blog Image */}
										<div className="h-48 overflow-hidden bg-muted/50 relative">
											{!imageErrors.has(blogId) && blog.image ? (
												<img
													src={`http://localhost:5000${blog.image}`}
													alt={blog.title}
													className="w-full h-full object-cover transition-opacity duration-300"
													onError={() => handleImageError(blogId)}
													onLoad={() => handleImageLoad(blogId)}
													loading="lazy"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
													<svg
														className="w-16 h-16 text-muted-foreground/50"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={1.5}
															d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
												</div>
											)}
										</div>

										{/* Blog Content */}
										<div className="p-6">
											<div className="text-sm text-muted-foreground mb-2">
												{formatDate(blog.updatedAt)}
											</div>
											<h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
											<p className="text-muted-foreground mb-4">
												{truncateText(blog.body.replace(/<[^>]*>/g, ""), 120)}
											</p>
											<a
												href={`/blog/${blog._id}`}
												className="inline-flex items-center text-primary font-medium"
											>
												Baca selengkapnya
												<ArrowRight className="ml-2 h-4 w-4" />
											</a>
										</div>
									</div>
								)
							})}
						</div>

						{/* View All Button */}
						<div className="flex justify-center mt-12">
							<Button variant="outline" asChild>
								<a href="/blog">
									Lihat Semua Artikel
									<ArrowRight className="ml-2 h-4 w-4" />
								</a>
							</Button>
						</div>
					</>
				)}
			</div>
		</section>
	)
}

export default BlogSection
