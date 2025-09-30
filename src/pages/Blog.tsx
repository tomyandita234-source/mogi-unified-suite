import { useEffect, useState } from "react"
import { BlogAPI } from "@/lib/api"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import type { Blog } from "@/lib/api"

const Blog = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setLoading(true)
				const response = await BlogAPI.getAll()
				// Filter only published blogs
				// Note: The current API doesn't return isShow field, so we'll show all blogs
				setBlogs(response)
			} catch (error) {
				console.error("Error fetching blogs:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container-width section-padding">
				<div className="text-center mb-16">
					<h1 className="heading-xl text-foreground mb-6">Blog MogiApp</h1>
					<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
						Temukan artikel terbaru, tips, dan berita seputar dunia bisnis dan teknologi
					</p>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<Card key={i} className="overflow-hidden">
								<Skeleton className="h-48 w-full" />
								<CardHeader>
									<Skeleton className="h-6 w-3/4 mb-2" />
									<Skeleton className="h-4 w-1/2" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-3/4" />
								</CardContent>
							</Card>
						))}
					</div>
				) : blogs.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogs.map((blog) => (
							<Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow">
								{blog.image && (
									<div className="h-48 overflow-hidden">
										<img
											src={`http://localhost:5000${blog.image}`}
											alt={blog.title}
											className="w-full h-full object-cover transition-transform hover:scale-105"
										/>
									</div>
								)}
								<CardHeader>
									<CardTitle className="line-clamp-2">{blog.title}</CardTitle>
									<CardDescription className="flex items-center gap-2">
										<Calendar className="h-4 w-4" />
										{blog.createdAt ? formatDate(blog.createdAt) : "Tanggal tidak tersedia"}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="line-clamp-3 text-muted-foreground">{blog.body}</p>
								</CardContent>
								<CardFooter className="flex justify-between items-center">
									<Button variant="outline" size="sm" asChild>
										<Link to={`/blog/${blog._id}`}>Baca Selengkapnya</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<h3 className="heading-md mb-4">Belum ada artikel</h3>
						<p className="text-muted-foreground">
							Artikel blog akan segera hadir. Silakan kunjungi kembali nanti.
						</p>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default Blog
