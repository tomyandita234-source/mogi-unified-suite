import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, Save, Eye, EyeOff, User } from "lucide-react"
import { BlogAPI, ProductAPI, UserAPI, ContactAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { Blog, Product, User as UserType, ContactMessage } from "@/lib/api"
import { validateUserRegistration, validateProductForm, validateBlogForm } from "@/utils/validation"
import LoadingOverlay from "@/components/LoadingOverlay"

// Interface for profile updates that can include password
interface ProfileUpdateData {
	email?: string
	password?: string
}

const Admin = () => {
	const { toast } = useToast()
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
						setImagePreview(null)
					}}
					className="mb-4"
				>
					Back to Blogs
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>{currentBlog?._id ? "Edit Blog" : "Add New Blog"}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										name="title"
										value={currentBlog?.title || ""}
										onChange={handleBlogInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="slug">Slug</Label>
									<div className="flex space-x-2">
										<Input
											id="slug"
											name="slug"
											value={currentBlog?.slug || ""}
											onChange={handleBlogInputChange}
										/>
										<Button variant="outline" onClick={generateSlug}>
											Generate
										</Button>
									</div>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="body">Content</Label>
								<Textarea
									id="body"
									name="body"
									value={currentBlog?.body || ""}
									onChange={handleBlogInputChange}
									className="min-h-[200px]"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="image">Featured Image</Label>
								<div className="flex items-center space-x-2">
									<Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
									{imagePreview && (
										<div className="relative">
											<img
												src={imagePreview}
												alt="Preview"
												className="w-16 h-16 object-cover rounded"
											/>
										</div>
									)}
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Switch
									id="isShow"
									checked={currentBlog?.isShow || false}
									onCheckedChange={handleBlogVisibilityChange}
								/>
								<Label htmlFor="isShow">Visible</Label>
							</div>
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
										onChange={handleProductInputChange}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="productImage">Product Image</Label>
								<div className="flex items-center space-x-2">
									<Input
										id="productImage"
										type="file"
										accept="image/*"
										onChange={handleProductImageChange}
									/>
									{currentProduct?.imageUrl && (
										<div className="relative">
											<img
												src={currentProduct.imageUrl}
												alt="Preview"
												className="w-16 h-16 object-cover rounded"
											/>
										</div>
									)}
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Switch
									id="isActive"
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
								<Label htmlFor="isActive">Active</Label>
							</div>
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
										disabled={!!currentUser?._id} // Can't change username for existing users
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
									<Select value={currentUser?.role || "user"} onValueChange={handleUserRoleChange}>
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
									<Switch
										id="isActive"
										checked={currentUser?.isActive || false}
										onCheckedChange={handleUserStatusChange}
									/>
									<Label htmlFor="isActive">Active</Label>
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
		<div className="container mx-auto p-4 relative">
			<LoadingOverlay isLoading={loading} message="Loading data..." overlay={true} />
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Admin Dashboard</h1>
				<Button variant="outline" onClick={handleLogout}>
					Logout
				</Button>
			</div>
			<Tabs defaultValue="blog">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="blog">Blog Management</TabsTrigger>
					<TabsTrigger value="product">Product Management</TabsTrigger>
					<TabsTrigger value="user">User Management</TabsTrigger>
					<TabsTrigger value="contact">Contact Messages</TabsTrigger>
					<TabsTrigger value="profile">Profile</TabsTrigger>
				</TabsList>
				<TabsContent value="blog">
					<Card>
						<CardHeader>
							<CardTitle>Blog Posts</CardTitle>
							<CardDescription>Manage your blog posts</CardDescription>
						</CardHeader>
						<CardContent>
							{blogs.length === 0 ? (
								<p>No blogs found. Create your first blog post.</p>
							) : (
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{blogs.map((blog) => (
											<Card key={blog._id} className="overflow-hidden">
												<div className="p-4">
													<div className="flex justify-between items-start">
														<div>
															<h3 className="font-medium">
																{blog.title}
																{blog.isShow ? (
																	<Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
																) : (
																	<EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
																)}
															</h3>
															<p className="text-sm text-muted-foreground">{blog.slug}</p>
														</div>
														<div className="flex gap-2">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => handleEditBlog(blog)}
															>
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																onClick={() => blog._id && handleDeleteBlog(blog._id)}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							)}
							<Button onClick={handleNewBlog} className="mt-4">
								<Plus className="mr-2 h-4 w-4" />
								Add New Blog
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="product">
					<Card>
						<CardHeader>
							<CardTitle>Products</CardTitle>
							<CardDescription>Manage your products</CardDescription>
						</CardHeader>
						<CardContent>
							{products.length === 0 ? (
								<p>No products found. Create your first product.</p>
							) : (
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{products.map((product) => (
											<Card key={product._id} className="overflow-hidden">
												<div className="p-4">
													<div className="flex justify-between items-start">
														<div>
															<h3 className="font-medium">
																{product.name}
																{product.isActive ? (
																	<Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
																) : (
																	<EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
																)}
															</h3>
															<p className="text-sm text-muted-foreground">
																{product.category}
															</p>
														</div>
														<div className="flex gap-2">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => handleEditProduct(product)}
															>
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																onClick={() =>
																	product._id && handleDeleteProduct(product._id)
																}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							)}
							<Button onClick={handleNewProduct} className="mt-4">
								<Plus className="mr-2 h-4 w-4" />
								Add New Product
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="user">
					<Card>
						<CardHeader>
							<CardTitle>Users</CardTitle>
							<CardDescription>Manage your users</CardDescription>
						</CardHeader>
						<CardContent>
							{users.length === 0 ? (
								<p>No users found.</p>
							) : (
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{users.map((user) => (
											<Card key={user._id} className="overflow-hidden">
												<div className="p-4">
													<div className="flex justify-between items-start">
														<div>
															<h3 className="font-medium">
																{user.username}
																{user.isActive ? (
																	<Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
																) : (
																	<EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
																)}
															</h3>
															<p className="text-sm text-muted-foreground">
																{user.email}
															</p>
															<p className="text-xs text-muted-foreground mt-1">
																Role: {user.role}
															</p>
														</div>
														<div className="flex gap-2">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => handleEditUser(user)}
															>
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																onClick={() => user._id && handleDeleteUser(user._id)}
																disabled={user.role === "admin"}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							)}
							<Button onClick={handleNewUser} className="mt-4">
								<Plus className="mr-2 h-4 w-4" />
								Add New User
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="contact">
					<Card>
						<CardHeader>
							<CardTitle>Contact Messages</CardTitle>
							<CardDescription>Manage contact form messages</CardDescription>
						</CardHeader>
						<CardContent>
							{contacts.length === 0 ? (
								<p>No contact messages found.</p>
							) : (
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{contacts.map((contact) => (
											<Card key={contact._id} className="overflow-hidden">
												<div className="p-4">
													<div className="flex justify-between items-start">
														<div>
															<h3 className="font-medium">{contact.name}</h3>
															<p className="text-sm text-muted-foreground">
																{contact.email}
															</p>
															{contact.phone && (
																<p className="text-xs text-muted-foreground mt-1">
																	Phone: {contact.phone}
																</p>
															)}
															<p className="text-xs text-muted-foreground mt-2">
																{new Date(contact.createdAt).toLocaleString()}
															</p>
														</div>
														<Button
															variant="ghost"
															size="icon"
															onClick={() =>
																contact._id && handleDeleteContact(contact._id)
															}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
													<div className="mt-3">
														<p className="text-sm text-foreground line-clamp-3">
															{contact.message}
														</p>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="profile">
					<Card>
						<CardHeader>
							<CardTitle>Profile</CardTitle>
							<CardDescription>Manage your profile information</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="flex items-center gap-4">
									<div className="bg-primary/10 p-3 rounded-full">
										<User className="h-8 w-8 text-primary" />
									</div>
									<div>
										<h3 className="text-lg font-medium">{currentProfile?.username}</h3>
										<p className="text-muted-foreground">{currentProfile?.email}</p>
										<p className="text-sm text-muted-foreground">Role: {currentProfile?.role}</p>
									</div>
								</div>
								<div className="border-t border-border pt-6">
									<div className="flex justify-between items-center">
										<div>
											<h4 className="font-medium">Account Information</h4>
											<p className="text-sm text-muted-foreground">
												Username: {currentProfile?.username}
											</p>
											<p className="text-sm text-muted-foreground">
												Email: {currentProfile?.email}
											</p>
											<p className="text-sm text-muted-foreground">
												Role: {currentProfile?.role}
											</p>
											<p className="text-sm text-muted-foreground">
												Status: {currentProfile?.isActive ? "Active" : "Inactive"}
											</p>
										</div>
										<Button onClick={handleEditProfile}>
											<Edit className="mr-2 h-4 w-4" />
											Edit Profile
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default Admin
