import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Save, Eye, EyeOff, User } from "lucide-react"
import { BlogAPI, ProductAPI, UserAPI, ContactAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { Blog, Product, User as UserType, ContactMessage } from "@/lib/api"
import { validateUserRegistration, validateProductForm, validateBlogForm } from "@/utils/validation"
import LoadingOverlay from "@/components/LoadingOverlay"
import Sidebar from "@/components/admin/Sidebar"
import Dashboard from "@/components/admin/Dashboard"
import YouTubeSection from "@/components/admin/YouTubeSection"

// Interface for profile updates that can include password
interface ProfileUpdateData {
	email?: string
	password?: string
}

const Admin = () => {
	const { toast } = useToast()
	const [activeTab, setActiveTab] = useState("dashboard")
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [users, setUsers] = useState<UserType[]>([])
	const [contacts, setContacts] = useState<ContactMessage[]>([])
	const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null)
	const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
	const [currentUser, setCurrentUser] = useState<Partial<UserType> | null>(null)
	const [currentProfile, setCurrentProfile] = useState<Partial<UserType> | null>(null)
	const [profilePassword, setProfilePassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isEditingBlog, setIsEditingBlog] = useState(false)
	const [isEditingProduct, setIsEditingProduct] = useState(false)
	const [isEditingUser, setIsEditingUser] = useState(false)
	const [isEditingProfile, setIsEditingProfile] = useState(false)
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
	const [isLoggedIn, setIsLoggedIn] = useState(!!token)
	const [loginData, setLoginData] = useState({ username: "", password: "" })
	const [error, setError] = useState("")
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [blogImage, setBlogImage] = useState<File | null>(null)
	const [productImage, setProductImage] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (token) {
			fetchBlogs()
			fetchProducts()
			fetchUsers()
			fetchContacts()
			fetchProfile()
		}
	}, [token])

	const fetchBlogs = async () => {
		try {
			setLoading(true)
			const response = await BlogAPI.getAll()
			setBlogs(response)
		} catch (error: any) {
			console.error("Error fetching blogs:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch blogs",
			})
		} finally {
			setLoading(false)
		}
	}

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await ProductAPI.getAll()
			setProducts(response)
		} catch (error: any) {
			console.error("Error fetching products:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch products",
			})
		} finally {
			setLoading(false)
		}
	}

	const fetchUsers = async () => {
		try {
			setLoading(true)
			const response = await UserAPI.getAllUsers()
			setUsers(response)
		} catch (error: any) {
			console.error("Error fetching users:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch users",
			})
		} finally {
			setLoading(false)
		}
	}

	const fetchContacts = async () => {
		try {
			setLoading(true)
			const response = await ContactAPI.getAll()
			setContacts(response)
		} catch (error: any) {
			console.error("Error fetching contacts:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch contact messages",
			})
		} finally {
			setLoading(false)
		}
	}

	const fetchProfile = async () => {
		try {
			setLoading(true)
			const response = await UserAPI.getProfile()
			setCurrentProfile(response)
		} catch (error: any) {
			console.error("Error fetching profile:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch profile",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		try {
			const data = await UserAPI.login(loginData.username, loginData.password)
			const { token } = data
			localStorage.setItem("token", token)
			setToken(token)
			setIsLoggedIn(true)
			fetchBlogs()
			fetchProducts()
			fetchUsers()
			fetchProfile()
			toast({
				title: "Login berhasil",
				description: "Selamat datang di dashboard admin",
			})
		} catch (error: any) {
			setError(error.message || "Login gagal")
			toast({
				variant: "destructive",
				title: "Login gagal",
				description: error.message || "Username atau password salah",
			})
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
		setToken(null)
		setIsLoggedIn(false)
		setBlogs([])
		setProducts([])
		setUsers([])
		setCurrentProfile(null)
		setActiveTab("dashboard")
		toast({
			title: "Logout berhasil",
			description: "Anda telah keluar dari sistem",
		})
	}

	const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setLoginData({
			...loginData,
			[name]: value,
		})
	}

	// Profile functions
	const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (name === "password") {
			setProfilePassword(value)
		} else if (name === "confirmPassword") {
			setConfirmPassword(value)
		} else if (currentProfile) {
			setCurrentProfile({
				...currentProfile,
				[name]: value,
			})
		}
	}

	const handleEditProfile = () => {
		setCurrentProfile({ ...currentProfile } as UserType)
		setIsEditingProfile(true)
	}

	const handleSaveProfile = async () => {
		if (!currentProfile) return

		// Check if passwords match
		if (profilePassword && profilePassword !== confirmPassword) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Passwords do not match",
			})
			return
		}

		try {
			// Only send the fields that can be updated
			const profileData: any = {
				email: currentProfile.email,
			}

			// Only include password if it's not empty
			if (profilePassword) {
				profileData.password = profilePassword
			}

			const updatedProfile = await UserAPI.updateProfile(profileData)
			setCurrentProfile(updatedProfile)
			setProfilePassword("")
			setConfirmPassword("")
			setIsEditingProfile(false)
			toast({
				title: "Success",
				description: "Profile updated successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	// Blog functions
	const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		if (currentBlog) {
			setCurrentBlog({
				...currentBlog,
				[name]: value,
			})
		}
	}

	const handleEditBlog = (blog: Blog) => {
		setCurrentBlog(blog)
		setIsEditingBlog(true)
		setImagePreview(blog.image || null)
	}

	const handleNewBlog = () => {
		setCurrentBlog({
			title: "",
			slug: "",
			body: "",
			isShow: false,
		})
		setIsEditingBlog(true)
		setImagePreview(null)
	}

	const handleSaveBlog = async () => {
		if (!currentBlog) return

		// Validate blog form
		const validation = validateBlogForm({
			title: currentBlog.title || "",
			slug: currentBlog.slug || "",
			body: currentBlog.body || "",
		})

		if (!validation.isValid) {
			// Show validation errors
			validation.errors.forEach((error) => {
				toast({
					variant: "destructive",
					title: "Validation Error",
					description: error.message,
				})
			})
			return
		}

		try {
			if (currentBlog._id) {
				// Update existing blog
				let updatedBlog
				if (blogImage) {
					// Update with new image
					updatedBlog = await BlogAPI.updateWithImage(currentBlog._id, currentBlog, blogImage)
				} else {
					// Update without image
					updatedBlog = await BlogAPI.update(currentBlog._id, currentBlog)
				}
				setBlogs(blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog)))
			} else {
				// Create new blog
				let newBlog
				if (blogImage) {
					// Create with image
					newBlog = await BlogAPI.createWithImage(currentBlog, blogImage)
				} else {
					// Create without image
					newBlog = await BlogAPI.create(currentBlog)
				}
				setBlogs([...blogs, newBlog])
			}

			setIsEditingBlog(false)
			setCurrentBlog(null)
			setImagePreview(null)
			setBlogImage(null)

			toast({
				title: "Success",
				description: `Blog ${currentBlog._id ? "updated" : "created"} successfully`,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleDeleteBlog = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this blog?")) return

		try {
			await BlogAPI.delete(id)
			setBlogs(blogs.filter((blog) => blog._id !== id))

			toast({
				title: "Success",
				description: "Blog deleted successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setBlogImage(file)

		const reader = new FileReader()
		reader.onloadend = () => {
			const base64String = reader.result as string
			setImagePreview(base64String)
			if (currentBlog) {
				setCurrentBlog({
					...currentBlog,
					image: base64String,
				})
			}
		}
		reader.readAsDataURL(file)
	}

	const handleBlogVisibilityChange = (checked: boolean) => {
		if (currentBlog) {
			setCurrentBlog({
				...currentBlog,
				isShow: checked,
			})
		}
	}

	const generateSlug = () => {
		if (currentBlog && currentBlog.title) {
			const slug = currentBlog.title
				.toLowerCase()
				.replace(/[^\w\s-]/g, "")
				.replace(/\s+/g, "-")

			setCurrentBlog({
				...currentBlog,
				slug,
			})
		}
	}

	// Product functions
	const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		if (currentProduct) {
			setCurrentProduct({
				...currentProduct,
				[name]: value,
			})
		}
	}

	const handleEditProduct = (product: Product) => {
		setCurrentProduct(product)
		setIsEditingProduct(true)
	}

	const handleNewProduct = () => {
		setCurrentProduct({
			name: "",
			slug: "",
			description: "",
			longDescription: "",
			category: "pos",
			features: [],
			benefits: [],
			pricing: {
				basic: {
					price: "",
					period: "/bulan",
					features: [],
				},
				pro: {
					price: "",
					period: "/bulan",
					features: [],
				},
				enterprise: {
					price: "Custom",
					period: "",
					features: [],
				},
			},
			isActive: true,
			imageUrl: "",
			sortOrder: 0,
		})
		setIsEditingProduct(true)
	}

	const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setProductImage(file)

		const reader = new FileReader()
		reader.onloadend = () => {
			const base64String = reader.result as string
			if (currentProduct) {
				setCurrentProduct({
					...currentProduct,
					imageUrl: base64String,
				})
			}
		}
		reader.readAsDataURL(file)
	}

	const handleSaveProduct = async () => {
		if (!currentProduct) return

		// Validate product form
		const validation = validateProductForm({
			name: currentProduct.name || "",
			slug: currentProduct.slug || "",
			description: currentProduct.description || "",
			category: currentProduct.category || "pos",
		})

		if (!validation.isValid) {
			// Show validation errors
			validation.errors.forEach((error) => {
				toast({
					variant: "destructive",
					title: "Validation Error",
					description: error.message,
				})
			})
			return
		}

		try {
			if (currentProduct._id) {
				// Update existing product
				let updatedProduct
				if (productImage) {
					// Update with new image
					updatedProduct = await ProductAPI.updateWithImage(currentProduct._id, currentProduct, productImage)
				} else {
					// Update without image
					updatedProduct = await ProductAPI.update(currentProduct._id, currentProduct)
				}
				setProducts(products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)))
			} else {
				// Create new product
				let newProduct
				if (productImage) {
					// Create with image
					newProduct = await ProductAPI.createWithImage(currentProduct, productImage)
				} else {
					// Create without image
					newProduct = await ProductAPI.create(currentProduct)
				}
				setProducts([...products, newProduct])
			}

			setIsEditingProduct(false)
			setCurrentProduct(null)
			setProductImage(null)
			setImagePreview(null)

			toast({
				title: "Success",
				description: `Product ${currentProduct._id ? "updated" : "created"} successfully`,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleDeleteProduct = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this product?")) return

		try {
			await ProductAPI.delete(id)
			setProducts(products.filter((product) => product._id !== id))

			toast({
				title: "Success",
				description: "Product deleted successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	// User functions
	const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (currentUser) {
			setCurrentUser({
				...currentUser,
				[name]: value,
			})
		}
	}

	const handleEditUser = (user: UserType) => {
		setCurrentUser(user)
		setIsEditingUser(true)
	}

	const handleNewUser = () => {
		setCurrentUser({
			username: "",
			email: "",
			role: "user",
			isActive: true,
		})
		setIsEditingUser(true)
	}

	const handleSaveUser = async () => {
		if (!currentUser) return

		// For new users, validate registration data
		if (!currentUser._id) {
			const validation = validateUserRegistration({
				username: currentUser.username || "",
				email: currentUser.email || "",
				password: "temp123", // Temporary password for validation
			})

			if (!validation.isValid) {
				// Show validation errors
				validation.errors.forEach((error) => {
					toast({
						variant: "destructive",
						title: "Validation Error",
						description: error.message,
					})
				})
				return
			}
		}

		try {
			if (currentUser._id) {
				// Update existing user
				const updatedUser = await UserAPI.updateUser(currentUser._id, currentUser)
				setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)))
			} else {
				// Create new user using register function
				// We need to generate a temporary password for new users
				const tempPassword = Math.random().toString(36).slice(-8)
				const newUser = await UserAPI.register(
					currentUser.username || "",
					currentUser.email || "",
					tempPassword
				)

				// After registration, we need to update the user with the correct role and status
				const updatedUser = await UserAPI.updateUser(newUser.user._id, {
					role: currentUser.role,
					isActive: currentUser.isActive,
				})

				setUsers([...users, updatedUser])

				toast({
					title: "Success",
					description: `User created successfully. Temporary password: ${tempPassword}`,
				})
			}

			setIsEditingUser(false)
			setCurrentUser(null)

			toast({
				title: "Success",
				description: `User ${currentUser._id ? "updated" : "created"} successfully`,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleDeleteUser = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this user?")) return

		try {
			await UserAPI.deleteUser(id)
			setUsers(users.filter((user) => user._id !== id))

			toast({
				title: "Success",
				description: "User deleted successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleDeleteContact = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this contact message?")) return

		try {
			await ContactAPI.delete(id)
			setContacts(contacts.filter((contact) => contact._id !== id))

			toast({
				title: "Success",
				description: "Contact message deleted successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleUserRoleChange = (value: string) => {
		if (currentUser) {
			setCurrentUser({
				...currentUser,
				role: value,
			})
		}
	}

	const handleUserStatusChange = (checked: boolean) => {
		if (currentUser) {
			setCurrentUser({
				...currentUser,
				isActive: checked,
			})
		}
	}

	if (!isLoggedIn) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>Admin Login</CardTitle>
						<CardDescription>Enter your credentials to access the admin panel</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin}>
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										name="username"
										type="text"
										placeholder="Enter your username"
										value={loginData.username}
										onChange={handleLoginInputChange}
										required
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										name="password"
										type="password"
										placeholder="Enter your password"
										value={loginData.password}
										onChange={handleLoginInputChange}
										required
									/>
								</div>
								{error && <p className="text-sm text-red-500">{error}</p>}
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isEditingProfile) {
		return (
			<div className="container mx-auto p-4">
				<Button
					variant="outline"
					onClick={() => {
						setIsEditingProfile(false)
					}}
					className="mb-4"
				>
					Back to Dashboard
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>Edit Profile</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="profileUsername">Username</Label>
									<Input
										id="profileUsername"
										name="username"
										value={currentProfile?.username || ""}
										onChange={handleProfileInputChange}
										disabled
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="profileEmail">Email</Label>
									<Input
										id="profileEmail"
										name="email"
										type="email"
										value={currentProfile?.email || ""}
										onChange={handleProfileInputChange}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="newPassword">New Password</Label>
									<Input
										id="newPassword"
										name="password"
										type="password"
										placeholder="Leave blank to keep current password"
										onChange={handleProfileInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<Input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										placeholder="Confirm new password"
										onChange={handleProfileInputChange}
									/>
								</div>
							</div>
							<Button onClick={handleSaveProfile}>
								<Save className="mr-2 h-4 w-4" />
								Save Profile
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isEditingBlog) {
		return (
			<div className="container mx-auto p-4">
				<Button
					variant="outline"
					onClick={() => {
						setIsEditingBlog(false)
					}}
					className="mb-4"
				>
					Back to Dashboard
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>{currentBlog?._id ? "Edit Blog" : "Create New Blog"}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="blogTitle">Title</Label>
									<Input
										id="blogTitle"
										name="title"
										value={currentBlog?.title || ""}
										onChange={handleBlogInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="blogSlug">Slug</Label>
									<Input
										id="blogSlug"
										name="slug"
										value={currentBlog?.slug || ""}
										onChange={handleBlogInputChange}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="blogBody">Body</Label>
								<Textarea
									id="blogBody"
									name="body"
									value={currentBlog?.body || ""}
									onChange={handleBlogInputChange}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="blogImage">Image</Label>
								<Input
									id="blogImage"
									name="image"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
								/>
							</div>
							{imagePreview && (
								<div className="flex items-center space-x-2">
									<img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover" />
									<Button
										variant="destructive"
										onClick={() => {
											setImagePreview(null)
											setBlogImage(null)
											if (currentBlog) {
												setCurrentBlog({
													...currentBlog,
													image: "",
												})
											}
										}}
									>
										<Trash2 className="mr-2 h-4 w-4" />
										Remove Image
									</Button>
								</div>
							)}
							<div className="flex items-center space-x-2">
								<Label htmlFor="blogVisibility">Visibility</Label>
								<Switch
									id="blogVisibility"
									checked={currentBlog?.isShow || false}
									onCheckedChange={handleBlogVisibilityChange}
								/>
							</div>
							<Button onClick={generateSlug}>
								<Plus className="mr-2 h-4 w-4" />
								Generate Slug
							</Button>
							<Button onClick={handleSaveBlog}>
								<Save className="mr-2 h-4 w-4" />
								Save Blog
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isEditingProduct) {
		return (
			<div className="container mx-auto p-4">
				<Button
					variant="outline"
					onClick={() => {
						setIsEditingProduct(false)
					}}
					className="mb-4"
				>
					Back to Products
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>{currentProduct?._id ? "Edit Product" : "Add New Product"}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Product Name</Label>
									<Input
										id="name"
										name="name"
										value={currentProduct?.name || ""}
										onChange={handleProductInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="slug">Slug</Label>
									<Input
										id="slug"
										name="slug"
										value={currentProduct?.slug || ""}
										onChange={handleProductInputChange}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="description">Short Description</Label>
								<Input
									id="description"
									name="description"
									value={currentProduct?.description || ""}
									onChange={handleProductInputChange}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="longDescription">Long Description</Label>
								<Textarea
									id="longDescription"
									name="longDescription"
									value={currentProduct?.longDescription || ""}
									onChange={handleProductInputChange}
									className="min-h-[100px]"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="category">Category</Label>
									<select
										id="category"
										name="category"
										value={currentProduct?.category || "pos"}
										onChange={(e) => {
											if (currentProduct) {
												setCurrentProduct({
													...currentProduct,
													category: e.target.value,
												})
											}
										}}
										className="border border-input bg-background rounded-md p-2"
									>
										<option value="pos">Mogi POS</option>
										<option value="pay">MogiPay</option>
										<option value="ops">Mogi Ops</option>
										<option value="fleet">Mogi Fleet</option>
										<option value="sign">MogiSign</option>
										<option value="library">Mogi Library</option>
										<option value="kampuz">Mogi Kampuz</option>
										<option value="dynamics">Mogi Dynamics</option>
										<option value="studio">Mogi Studio</option>
									</select>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="sortOrder">Sort Order</Label>
									<Input
										id="sortOrder"
										name="sortOrder"
										type="number"
										value={currentProduct?.sortOrder || 0}
										onChange={(e) => {
											if (currentProduct) {
												setCurrentProduct({
													...currentProduct,
													sortOrder: parseInt(e.target.value) || 0,
												})
											}
										}}
									/>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Label htmlFor="productActive">Active</Label>
								<Switch
									id="productActive"
									checked={currentProduct?.isActive || false}
									onCheckedChange={(checked) => {
										if (currentProduct) {
											setCurrentProduct({
												...currentProduct,
												isActive: checked,
											})
										}
									}}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="productImage">Product Image</Label>
								<Input
									id="productImage"
									name="imageUrl"
									type="file"
									accept="image/*"
									onChange={handleProductImageChange}
								/>
							</div>
							{currentProduct?.imageUrl && (
								<div className="flex items-center space-x-2">
									<img 
										src={currentProduct.imageUrl} 
										alt="Product Preview" 
										className="h-24 w-24 object-cover" 
									/>
									<Button
										variant="destructive"
										onClick={() => {
											if (currentProduct) {
												setCurrentProduct({
													...currentProduct,
													imageUrl: "",
												})
											}
										}}
									>
										<Trash2 className="mr-2 h-4 w-4" />
										Remove Image
									</Button>
								</div>
							)}
							<Button onClick={handleSaveProduct}>
								<Save className="mr-2 h-4 w-4" />
								Save Product
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isEditingUser) {
		return (
			<div className="container mx-auto p-4">
				<Button
					variant="outline"
					onClick={() => {
						setIsEditingUser(false)
					}}
					className="mb-4"
				>
					Back to Users
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>{currentUser?._id ? "Edit User" : "Add New User"}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										name="username"
										value={currentUser?.username || ""}
										onChange={handleUserInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={currentUser?.email || ""}
										onChange={handleUserInputChange}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="role">Role</Label>
									<Select
										value={currentUser?.role || "user"}
										onValueChange={handleUserRoleChange}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="user">User</SelectItem>
											<SelectItem value="admin">Admin</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center space-x-2 pt-6">
									<Label htmlFor="userActive">Active</Label>
									<Switch
										id="userActive"
										checked={currentUser?.isActive || false}
										onCheckedChange={handleUserStatusChange}
									/>
								</div>
							</div>
							<Button onClick={handleSaveUser}>
								<Save className="mr-2 h-4 w-4" />
								Save User
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
			<div className="flex-1 p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<div className="flex items-center space-x-4">
						<Button variant="outline" size="sm" onClick={handleEditProfile}>
							<User className="mr-2 h-4 w-4" />
							Profile
						</Button>
						<Button variant="outline" size="sm" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-6">
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="blogs">Blogs</TabsTrigger>
						<TabsTrigger value="products">Products</TabsTrigger>
						<TabsTrigger value="users">Users</TabsTrigger>
						<TabsTrigger value="contacts">Contacts</TabsTrigger>
						<TabsTrigger value="youtube">YouTube</TabsTrigger>
					</TabsList>

					<TabsContent value="dashboard">
						<Dashboard />
					</TabsContent>

					<TabsContent value="blogs">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<div>
										<CardTitle>Manage Blogs</CardTitle>
										<CardDescription>Create and manage your blog posts</CardDescription>
									</div>
									<Button onClick={handleNewBlog}>
										<Plus className="mr-2 h-4 w-4" />
										Add New Blog
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{blogs.map((blog) => (
										<Card key={blog._id}>
											<CardContent className="flex justify-between items-center p-4">
												<div>
													<h3 className="font-semibold">{blog.title}</h3>
													<p className="text-sm text-muted-foreground">
														{blog.slug}
													</p>
												</div>
												<div className="flex space-x-2">
													<Badge variant={blog.isShow ? "default" : "secondary"}>
														{blog.isShow ? "Published" : "Draft"}
													</Badge>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEditBlog(blog)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => blog._id && handleDeleteBlog(blog._id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="products">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<div>
										<CardTitle>Manage Products</CardTitle>
										<CardDescription>Create and manage your products</CardDescription>
									</div>
									<Button onClick={handleNewProduct}>
										<Plus className="mr-2 h-4 w-4" />
										Add New Product
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{products.map((product) => (
										<Card key={product._id}>
											<CardContent className="flex justify-between items-center p-4">
												<div>
													<h3 className="font-semibold">{product.name}</h3>
													<p className="text-sm text-muted-foreground">
														{product.slug}
													</p>
												</div>
												<div className="flex space-x-2">
													<Badge variant={product.isActive ? "default" : "secondary"}>
														{product.isActive ? "Active" : "Inactive"}
													</Badge>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEditProduct(product)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => product._id && handleDeleteProduct(product._id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="users">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<div>
										<CardTitle>Manage Users</CardTitle>
										<CardDescription>Create and manage users</CardDescription>
									</div>
									<Button onClick={handleNewUser}>
										<Plus className="mr-2 h-4 w-4" />
										Add New User
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{users.map((user) => (
										<Card key={user._id}>
											<CardContent className="flex justify-between items-center p-4">
												<div>
													<h3 className="font-semibold">{user.username}</h3>
													<p className="text-sm text-muted-foreground">
														{user.email}
													</p>
												</div>
												<div className="flex space-x-2">
													<Badge variant={user.isActive ? "default" : "secondary"}>
														{user.isActive ? "Active" : "Inactive"}
													</Badge>
													<Badge variant="outline">{user.role}</Badge>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleEditUser(user)}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => user._id && handleDeleteUser(user._id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="contacts">
						<Card>
							<CardHeader>
								<CardTitle>Manage Contact Messages</CardTitle>
								<CardDescription>View and manage contact form submissions</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{contacts.map((contact) => (
										<Card key={contact._id}>
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<h3 className="font-semibold">{contact.name}</h3>
														<p className="text-sm text-muted-foreground">{contact.email}</p>
														<p className="text-sm mt-2">{contact.message}</p>
													</div>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => contact._id && handleDeleteContact(contact._id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="youtube">
						<YouTubeSection />
					</TabsContent>
				</Tabs>
			</div>
			<LoadingOverlay isLoading={loading} />
		</div>
	)
}

export default Admin
