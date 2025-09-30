import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BlogAPI } from "@/lib/api"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import type { Blog } from "@/lib/api"

const BlogDetail = () => {
	const { blogId } = useParams()
	const navigate = useNavigate()
	const [blog, setBlog] = useState<Blog | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				setLoading(true)
				setError(null)

				if (!blogId) {
					throw new Error("Blog ID is required")
				}

				// Fetch blog from API
				const fetchedBlog = await BlogAPI.getById(blogId)
				setBlog(fetchedBlog)
			} catch (err: any) {
				console.error("Error fetching blog:", err)
				setError(err.message || "Failed to fetch blog details")
				// Navigate to 404 if blog not found
				if (err.message && err.message.includes("not found")) {
					navigate("/404")
				}
			} finally {
				setLoading(false)
			}
		}

		fetchBlog()
	}, [blogId, navigate])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16 flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
						<p className="mt-4 text-lg text-foreground">Loading blog details...</p>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Blog</h1>
							<p className="text-muted-foreground mb-8">{error}</p>
							<Button onClick={() => navigate(-1)}>Go Back</Button>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	if (!blog) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Blog Not Found</h1>
							<p className="text-muted-foreground mb-8">
								The blog post you're looking for doesn't exist or has been removed.
							</p>
							<Button onClick={() => navigate("/")}>Go Home</Button>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				<div className="container-width section-padding">
					<Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						Kembali ke Blog
					</Button>

					<article className="max-w-4xl mx-auto">
						<header className="mb-8">
							<h1 className="heading-xxl text-foreground mb-4">{blog.title}</h1>

							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
								<div className="flex items-center gap-2">
									<User className="h-4 w-4" />
									<span>{blog.createdBy || "Admin"}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									<time dateTime={blog.createdAt}>
										{blog.createdAt ? formatDate(blog.createdAt) : "Tanggal tidak tersedia"}
									</time>
								</div>
								<span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
									{blog.source || "Morfogenesis Teknologi Indonesia"}
								</span>
							</div>

							{blog.image && (
								<div className="rounded-xl overflow-hidden mb-8">
									<img
										src={`http://localhost:5000${blog.image}`}
										alt={blog.images_alt || blog.title}
										className="w-full h-auto object-cover"
									/>
									<figcaption className="text-sm text-muted-foreground text-center py-2">
										{blog.images_source || "Morfogenesis Teknologi Indonesia Creative Team"}
									</figcaption>
								</div>
							)}
						</header>

						<div
							className="prose prose-lg max-w-none text-foreground"
							dangerouslySetInnerHTML={{ __html: blog.body.replace(/\n/g, "<br>") }}
						/>
					</article>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default BlogDetail
