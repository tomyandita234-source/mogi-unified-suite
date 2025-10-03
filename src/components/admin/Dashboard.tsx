import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	TrendingUp,
	Mail,
	Eye,
	EyeOff,
	Users,
	ShoppingCart,
	BarChart3,
	PieChart,
	Activity,
	Calendar,
	Clock,
} from "lucide-react"
import { BlogAPI, ProductAPI, ContactAPI, AnalyticsAPI } from "@/lib/api"
import type { Blog, Product, ContactMessage, DashboardStats } from "@/lib/api"

const Dashboard = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [contacts, setContacts] = useState<ContactMessage[]>([])
	const [stats, setStats] = useState<DashboardStats>({
		totalBlogs: 0,
		totalProducts: 0,
		totalContacts: 0,
		unreadContacts: 0,
		recentBlogs: 0,
		activeProducts: 0,
		totalUsers: 0,
		recentUsers: 0,
	})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			setLoading(true)

			// Fetch analytics data
			const analyticsResponse = await AnalyticsAPI.getDashboardStats()

			// Fetch other data
			const [blogData, productData, contactData] = await Promise.all([
				BlogAPI.getAll(),
				ProductAPI.getAll(),
				ContactAPI.getAll(),
			])

			setBlogs(blogData)
			setProducts(productData)
			setContacts(contactData)

			setStats(analyticsResponse.stats)
		} catch (error) {
			console.error("Error fetching dashboard data:", error)
		} finally {
			setLoading(false)
		}
	}

	// Get most viewed blogs (for demo, we'll sort by ID, but handle undefined IDs)
	const mostViewedBlogs = [...blogs]
		.sort((a, b) => {
			// Handle cases where _id might be undefined
			const idA = a._id || ""
			const idB = b._id || ""
			return idB.localeCompare(idA)
		})
		.slice(0, 5)

	// Get most viewed products (for demo, we'll sort by ID, but handle undefined IDs)
	const mostViewedProducts = [...products]
		.sort((a, b) => {
			// Handle cases where _id might be undefined
			const idA = a._id || ""
			const idB = b._id || ""
			return idB.localeCompare(idA)
		})
		.slice(0, 5)

	// Get recent contacts
	const recentContacts = [...contacts]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5)

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
						<BarChart3 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalBlogs}</div>
						<p className="text-xs text-muted-foreground">{stats.recentBlogs} new this month</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Products</CardTitle>
						<ShoppingCart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalProducts}</div>
						<p className="text-xs text-muted-foreground">{stats.activeProducts} active</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
						<Mail className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalContacts}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-500 font-medium">{stats.unreadContacts}</span> new this week
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalUsers}</div>
						<p className="text-xs text-muted-foreground">{stats.recentUsers} new this month</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Most Viewed Blogs */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Recent Blogs
						</CardTitle>
						<CardDescription>Latest published blog posts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mostViewedBlogs.map((blog) => (
								<div key={blog._id || blog.slug} className="flex items-center justify-between">
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium truncate">{blog.title}</p>
										<p className="text-xs text-muted-foreground truncate">{blog.slug}</p>
									</div>
									<div className="flex items-center gap-2">
										{blog.isShow ? (
											<Eye className="h-4 w-4 text-green-500" />
										) : (
											<EyeOff className="h-4 w-4 text-red-500" />
										)}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Most Viewed Products */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="h-5 w-5" />
							Recent Products
						</CardTitle>
						<CardDescription>Latest added products</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mostViewedProducts.map((product) => (
								<div key={product._id || product.slug} className="flex items-center justify-between">
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium truncate">{product.name}</p>
										<p className="text-xs text-muted-foreground capitalize">{product.category}</p>
									</div>
									<div className="flex items-center gap-2">
										{product.isActive ? (
											<Eye className="h-4 w-4 text-green-500" />
										) : (
											<EyeOff className="h-4 w-4 text-red-500" />
										)}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Contact Messages */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Mail className="h-5 w-5" />
							Recent Contact Messages
						</CardTitle>
						<CardDescription>Latest inquiries from visitors</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentContacts.map((contact) => (
								<div key={contact._id || contact.email} className="flex items-start gap-3">
									<div className="bg-primary/10 p-2 rounded-full">
										<Mail className="h-4 w-4 text-primary" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<p className="text-sm font-medium truncate">{contact.name}</p>
											<Badge variant="outline" className="text-xs">
												{new Date(contact.createdAt).toLocaleDateString()}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground truncate">{contact.email}</p>
										<p className="text-xs mt-1 line-clamp-2">{contact.message}</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Activity Overview */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							Recent Activity
						</CardTitle>
						<CardDescription>Latest updates and changes</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="bg-green-500/10 p-2 rounded-full">
									<Calendar className="h-4 w-4 text-green-500" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">New blog post published</p>
									<p className="text-xs text-muted-foreground">
										"Maximizing Efficiency with Mogi POS"
									</p>
									<p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="bg-blue-500/10 p-2 rounded-full">
									<ShoppingCart className="h-4 w-4 text-blue-500" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">Product updated</p>
									<p className="text-xs text-muted-foreground">MogiPay payment gateway</p>
									<p className="text-xs text-muted-foreground mt-1">1 day ago</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="bg-purple-500/10 p-2 rounded-full">
									<Users className="h-4 w-4 text-purple-500" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">New user registered</p>
									<p className="text-xs text-muted-foreground">john.doe@example.com</p>
									<p className="text-xs text-muted-foreground mt-1">2 days ago</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="bg-yellow-500/10 p-2 rounded-full">
									<Clock className="h-4 w-4 text-yellow-500" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">Scheduled maintenance</p>
									<p className="text-xs text-muted-foreground">System update planned for tonight</p>
									<p className="text-xs text-muted-foreground mt-1">3 days ago</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Dashboard
