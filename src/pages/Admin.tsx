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
import { Plus, Trash2, Edit, Save, Eye, EyeOff, User, ChevronLeft, ChevronRight } from "lucide-react"
import { BlogAPI, ProductAPI, UserAPI, ContactAPI, CareerAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { Blog, Product, User as UserType, ContactMessage, Career } from "@/lib/api"
import { validateUserRegistration, validateProductForm, validateBlogForm } from "@/utils/validation"
import LoadingOverlay from "@/components/LoadingOverlay"
import Sidebar from "@/components/admin/Sidebar"
import Dashboard from "@/components/admin/Dashboard"
import YouTubeSection from "@/components/admin/YouTubeSection"
import ApiManagement from "@/components/admin/ApiManagement"

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
	const [careers, setCareers] = useState<Career[]>([])
	const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null)
	const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
	const [currentUser, setCurrentUser] = useState<Partial<UserType> | null>(null)
	const [currentCareer, setCurrentCareer] = useState<Partial<Career> | null>(null)
	const [currentProfile, setCurrentProfile] = useState<Partial<UserType> | null>(null)
	const [profilePassword, setProfilePassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isEditingBlog, setIsEditingBlog] = useState(false)
	const [isEditingProduct, setIsEditingProduct] = useState(false)
	const [isEditingUser, setIsEditingUser] = useState(false)
	const [isEditingCareer, setIsEditingCareer] = useState(false)
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
			fetchCareers()
			fetchProfile()
		}
	}, [token])

	const fetchBlogs = async () => {
		try {
			setLoading(true)
			const response = await BlogAPI.getAll()
			console.log("Fetched blogs:", response) // Debug log
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
			console.log("Fetched products:", response) // Debug log
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
			console.log("Fetched users:", response) // Debug log
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

	const fetchCareers = async () => {
		try {
			setLoading(true)
			const response = await CareerAPI.getAll()
			setCareers(response)
		} catch (error: any) {
			console.error("Error fetching careers:", error)
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch careers",
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
			fetchCareers()
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
		setCareers([])
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

	// Add this new function to handle product selection
	const handleBlogProductChange = (value: string) => {
		if (currentBlog) {
			// If "no product" is selected (empty string), set productId to null
			const productId = value ? value : null
			setCurrentBlog({
				...currentBlog,
				productId: productId,
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
		if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

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
				description: error.message || "Failed to delete user",
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

	const handleResetUserPassword = async (id: string) => {
		if (!window.confirm("Are you sure you want to reset this user's password?")) return

		try {
			const response = await UserAPI.resetUserPassword(id)
			toast({
				title: "Password Reset",
				description: `Password reset successfully. New password: ${response.newPassword}`,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Failed to reset password",
			})
		}
	}

	// Career functions
	const handleCareerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		if (currentCareer) {
			setCurrentCareer({
				...currentCareer,
				[name]: value,
			})
		}
	}

	const handleCareerRequirementsChange = (index: number, value: string) => {
		if (currentCareer && currentCareer.requirements) {
			const newRequirements = [...currentCareer.requirements]
			newRequirements[index] = value
			setCurrentCareer({
				...currentCareer,
				requirements: newRequirements,
			})
		}
	}

	const addCareerRequirement = () => {
		if (currentCareer) {
			const newRequirements = currentCareer.requirements ? [...currentCareer.requirements, ""] : [""]
			setCurrentCareer({
				...currentCareer,
				requirements: newRequirements,
			})
		}
	}

	const removeCareerRequirement = (index: number) => {
		if (currentCareer && currentCareer.requirements) {
			const newRequirements = [...currentCareer.requirements]
			newRequirements.splice(index, 1)
			setCurrentCareer({
				...currentCareer,
				requirements: newRequirements,
			})
		}
	}

	const handleEditCareer = (career: Career) => {
		setCurrentCareer(career)
		setIsEditingCareer(true)
	}

	const handleNewCareer = () => {
		setCurrentCareer({
			title: "",
			department: "",
			location: "",
			type: "Full-time",
			experience: "",
			description: "",
			requirements: [""],
			isActive: true,
			sortOrder: 0,
		})
		setIsEditingCareer(true)
	}

	const handleSaveCareer = async () => {
		if (!currentCareer) return

		// Validate required fields
		if (
			!currentCareer.title ||
			!currentCareer.department ||
			!currentCareer.location ||
			!currentCareer.description
		) {
			toast({
				variant: "destructive",
				title: "Validation Error",
				description: "Title, department, location, and description are required",
			})
			return
		}

		try {
			if (currentCareer._id) {
				// Update existing career
				const updatedCareer = await CareerAPI.update(currentCareer._id, currentCareer)
				setCareers(careers.map((career) => (career._id === updatedCareer._id ? updatedCareer : career)))
			} else {
				// Create new career
				const newCareer = await CareerAPI.create(currentCareer)
				setCareers([...careers, newCareer])
			}

			setIsEditingCareer(false)
			setCurrentCareer(null)

			toast({
				title: "Success",
				description: `Career ${currentCareer._id ? "updated" : "created"} successfully`,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleDeleteCareer = async (id: string) => {
		if (!window.confirm("Are you sure you want to delete this career?")) return

		try {
			await CareerAPI.delete(id)
			setCareers(careers.filter((career) => career._id !== id))

			toast({
				title: "Success",
				description: "Career deleted successfully",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong",
			})
		}
	}

	const handleCareerStatusChange = (checked: boolean) => {
		if (currentCareer) {
			setCurrentCareer({
				...currentCareer,
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
							{/* Add Product Selection Dropdown */}
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="blogProduct">Product (Optional)</Label>
								<select
									id="blogProduct"
									value={currentBlog?.productId || ""}
									onChange={(e) => handleBlogProductChange(e.target.value)}
									className="border border-input bg-background rounded-md p-2"
								>
									<option value="">No Product (General Blog)</option>
									{products.map((product) => (
										<option key={product._id} value={product._id}>
											{product.name}
										</option>
									))}
								</select>
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

							{/* Pricing Section */}
							<div className="border-t pt-4">
								<h3 className="text-lg font-medium mb-4">Pricing Plans</h3>

								{/* Basic Plan */}
								<div className="mb-6 p-4 border rounded-lg">
									<h4 className="font-medium mb-3">Basic Plan</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="basicPrice">Price</Label>
											<Input
												id="basicPrice"
												name="basicPrice"
												value={currentProduct?.pricing?.basic?.price || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																basic: {
																	...currentProduct.pricing?.basic,
																	price: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., Rp 299.000"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="basicPeriod">Period</Label>
											<Input
												id="basicPeriod"
												name="basicPeriod"
												value={currentProduct?.pricing?.basic?.period || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																basic: {
																	...currentProduct.pricing?.basic,
																	period: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., /bulan"
											/>
										</div>
									</div>
									<div className="mt-3">
										<Label htmlFor="basicFeatures">Features (one per line)</Label>
										<Textarea
											id="basicFeatures"
											value={currentProduct?.pricing?.basic?.features?.join("\n") || ""}
											onChange={(e) => {
												if (currentProduct) {
													const features = e.target.value
														.split("\n")
														.filter((f) => f.trim() !== "")
													setCurrentProduct({
														...currentProduct,
														pricing: {
															...currentProduct.pricing,
															basic: {
																...currentProduct.pricing?.basic,
																features: features,
															},
														},
													})
												}
											}}
											className="min-h-[80px]"
											placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
										/>
									</div>
								</div>

								{/* Pro Plan */}
								<div className="mb-6 p-4 border rounded-lg">
									<h4 className="font-medium mb-3">Pro Plan</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="proPrice">Price</Label>
											<Input
												id="proPrice"
												name="proPrice"
												value={currentProduct?.pricing?.pro?.price || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																pro: {
																	...currentProduct.pricing?.pro,
																	price: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., Rp 799.000"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="proPeriod">Period</Label>
											<Input
												id="proPeriod"
												name="proPeriod"
												value={currentProduct?.pricing?.pro?.period || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																pro: {
																	...currentProduct.pricing?.pro,
																	period: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., /bulan"
											/>
										</div>
									</div>
									<div className="mt-3">
										<Label htmlFor="proFeatures">Features (one per line)</Label>
										<Textarea
											id="proFeatures"
											value={currentProduct?.pricing?.pro?.features?.join("\n") || ""}
											onChange={(e) => {
												if (currentProduct) {
													const features = e.target.value
														.split("\n")
														.filter((f) => f.trim() !== "")
													setCurrentProduct({
														...currentProduct,
														pricing: {
															...currentProduct.pricing,
															pro: {
																...currentProduct.pricing?.pro,
																features: features,
															},
														},
													})
												}
											}}
											className="min-h-[80px]"
											placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
										/>
									</div>
								</div>

								{/* Enterprise Plan */}
								<div className="p-4 border rounded-lg">
									<h4 className="font-medium mb-3">Enterprise Plan</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="enterprisePrice">Price</Label>
											<Input
												id="enterprisePrice"
												name="enterprisePrice"
												value={currentProduct?.pricing?.enterprise?.price || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																enterprise: {
																	...currentProduct.pricing?.enterprise,
																	price: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., Custom"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="enterprisePeriod">Period</Label>
											<Input
												id="enterprisePeriod"
												name="enterprisePeriod"
												value={currentProduct?.pricing?.enterprise?.period || ""}
												onChange={(e) => {
													if (currentProduct) {
														setCurrentProduct({
															...currentProduct,
															pricing: {
																...currentProduct.pricing,
																enterprise: {
																	...currentProduct.pricing?.enterprise,
																	period: e.target.value,
																},
															},
														})
													}
												}}
												placeholder="e.g., (leave blank for custom)"
											/>
										</div>
									</div>
									<div className="mt-3">
										<Label htmlFor="enterpriseFeatures">Features (one per line)</Label>
										<Textarea
											id="enterpriseFeatures"
											value={currentProduct?.pricing?.enterprise?.features?.join("\n") || ""}
											onChange={(e) => {
												if (currentProduct) {
													const features = e.target.value
														.split("\n")
														.filter((f) => f.trim() !== "")
													setCurrentProduct({
														...currentProduct,
														pricing: {
															...currentProduct.pricing,
															enterprise: {
																...currentProduct.pricing?.enterprise,
																features: features,
															},
														},
													})
												}
											}}
											className="min-h-[80px]"
											placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
										/>
									</div>
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

	if (isEditingCareer) {
		return (
			<div className="container mx-auto p-4">
				<Button
					variant="outline"
					onClick={() => {
						setIsEditingCareer(false)
					}}
					className="mb-4"
				>
					Back to Careers
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>{currentCareer?._id ? "Edit Career" : "Add New Career"}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerTitle">Title</Label>
									<Input
										id="careerTitle"
										name="title"
										value={currentCareer?.title || ""}
										onChange={handleCareerInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerDepartment">Department</Label>
									<Input
										id="careerDepartment"
										name="department"
										value={currentCareer?.department || ""}
										onChange={handleCareerInputChange}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerLocation">Location</Label>
									<Input
										id="careerLocation"
										name="location"
										value={currentCareer?.location || ""}
										onChange={handleCareerInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerType">Type</Label>
									<select
										id="careerType"
										name="type"
										value={currentCareer?.type || "Full-time"}
										onChange={(e) => {
											if (currentCareer) {
												setCurrentCareer({
													...currentCareer,
													type: e.target.value,
												})
											}
										}}
										className="border border-input bg-background rounded-md p-2"
									>
										<option value="Full-time">Full-time</option>
										<option value="Part-time">Part-time</option>
										<option value="Contract">Contract</option>
										<option value="Internship">Internship</option>
									</select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerExperience">Experience</Label>
									<Input
										id="careerExperience"
										name="experience"
										value={currentCareer?.experience || ""}
										onChange={handleCareerInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="careerSortOrder">Sort Order</Label>
									<Input
										id="careerSortOrder"
										name="sortOrder"
										type="number"
										value={currentCareer?.sortOrder || 0}
										onChange={(e) => {
											if (currentCareer) {
												setCurrentCareer({
													...currentCareer,
													sortOrder: parseInt(e.target.value) || 0,
												})
											}
										}}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="careerDescription">Description</Label>
								<Textarea
									id="careerDescription"
									name="description"
									value={currentCareer?.description || ""}
									onChange={handleCareerInputChange}
									className="min-h-[100px]"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label>Requirements</Label>
								{currentCareer?.requirements?.map((req, index) => (
									<div key={index} className="flex gap-2">
										<Input
											value={req}
											onChange={(e) => handleCareerRequirementsChange(index, e.target.value)}
											placeholder={`Requirement ${index + 1}`}
										/>
										<Button
											variant="destructive"
											size="icon"
											onClick={() => removeCareerRequirement(index)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))}
								<Button variant="outline" onClick={addCareerRequirement}>
									<Plus className="mr-2 h-4 w-4" />
									Add Requirement
								</Button>
							</div>
							<div className="flex items-center space-x-2">
								<Label htmlFor="careerActive">Active</Label>
								<Switch
									id="careerActive"
									checked={currentCareer?.isActive || false}
									onCheckedChange={handleCareerStatusChange}
								/>
							</div>
							<Button onClick={handleSaveCareer}>
								<Save className="mr-2 h-4 w-4" />
								Save Career
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
			<div className="flex-1 p-6 lg:p-8">
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-6 md:grid-cols-11 gap-1 mb-6 overflow-x-auto">
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="blogs">Blogs</TabsTrigger>
						<TabsTrigger value="products">Products</TabsTrigger>
						<TabsTrigger value="users">Users</TabsTrigger>
						<TabsTrigger value="contacts">Contacts</TabsTrigger>
						<TabsTrigger value="youtube">YouTube</TabsTrigger>
						<TabsTrigger value="categories">Categories</TabsTrigger>
						<TabsTrigger value="comments">Comments</TabsTrigger>
						<TabsTrigger value="careers">Careers</TabsTrigger>
						<TabsTrigger value="api">API</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
						<TabsTrigger value="profile">Profile</TabsTrigger>
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
								{blogs.length === 0 ? (
									<p>No blogs found. Click "Add New Blog" to create your first blog post.</p>
								) : (
									<div className="space-y-4">
										{blogs.map((blog) => (
											<Card key={blog._id}>
												<CardContent className="flex justify-between items-center p-4">
													<div>
														<h3 className="font-semibold">{blog.title}</h3>
														<p className="text-sm text-muted-foreground">{blog.slug}</p>
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
								)}
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
								{products.length === 0 ? (
									<p>No products found. Click "Add New Product" to create your first product.</p>
								) : (
									<div className="space-y-4">
										{products.map((product) => (
											<Card key={product._id}>
												<CardContent className="flex justify-between items-center p-4">
													<div>
														<h3 className="font-semibold">{product.name}</h3>
														<p className="text-sm text-muted-foreground">{product.slug}</p>
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
															onClick={() =>
																product._id && handleDeleteProduct(product._id)
															}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								)}
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
													<p className="text-sm text-muted-foreground">{user.email}</p>
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
														variant="secondary"
														size="sm"
														onClick={() => user._id && handleResetUserPassword(user._id)}
													>
														Reset Password
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
													<div className="flex-1">
														<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
															<h3 className="font-semibold">{contact.name}</h3>
															<span className="text-sm text-muted-foreground">
																{new Date(contact.createdAt).toLocaleString("id-ID")}
															</span>
														</div>
														<p className="text-sm text-muted-foreground mb-2">
															{contact.email}
														</p>
														{contact.phone && (
															<p className="text-sm text-muted-foreground mb-2">
																Phone: {contact.phone}
															</p>
														)}
														<p className="text-sm mt-2 whitespace-pre-wrap">
															{contact.message}
														</p>
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

					<TabsContent value="careers">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<div>
										<CardTitle>Manage Careers</CardTitle>
										<CardDescription>Create and manage career opportunities</CardDescription>
									</div>
									<Button onClick={handleNewCareer}>
										<Plus className="mr-2 h-4 w-4" />
										Add New Career
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{careers.length === 0 ? (
									<p>
										No careers found. Click "Add New Career" to create your first career
										opportunity.
									</p>
								) : (
									<div className="space-y-4">
										{careers.map((career) => (
											<Card key={career._id}>
												<CardContent className="flex justify-between items-center p-4">
													<div>
														<h3 className="font-semibold">{career.title}</h3>
														<p className="text-sm text-muted-foreground">
															{career.department} - {career.location}
														</p>
													</div>
													<div className="flex space-x-2">
														<Badge variant={career.isActive ? "default" : "secondary"}>
															{career.isActive ? "Active" : "Inactive"}
														</Badge>
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleEditCareer(career)}
														>
															<Edit className="h-4 w-4" />
														</Button>
														<Button
															variant="destructive"
															size="sm"
															onClick={() => career._id && handleDeleteCareer(career._id)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="youtube">
						<YouTubeSection />
					</TabsContent>

					<TabsContent value="categories">
						<Card>
							<CardHeader>
								<CardTitle>Blog Categories</CardTitle>
								<CardDescription>Manage blog post categories</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex gap-4 mb-6">
									<Input placeholder="Category name" className="flex-1" />
									<Button>
										<Plus className="mr-2 h-4 w-4" />
										Add Category
									</Button>
								</div>
								<div className="space-y-4">
									{["Technology", "Business", "Marketing", "Product Updates"].map(
										(category, index) => (
											<Card key={index}>
												<CardContent className="flex justify-between items-center p-4">
													<span className="font-medium">{category}</span>
													<div className="space-x-2">
														<Button variant="outline" size="sm">
															<Edit className="h-4 w-4" />
														</Button>
														<Button variant="destructive" size="sm">
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</CardContent>
											</Card>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="comments">
						<Card>
							<CardHeader>
								<CardTitle>Blog Comments</CardTitle>
								<CardDescription>Manage comments on blog posts</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											id: 1,
											author: "John Doe",
											post: "Getting Started with Mogi POS",
											comment: "Great tutorial! Very helpful.",
											date: "2023-05-15",
										},
										{
											id: 2,
											author: "Jane Smith",
											post: "Advanced MogiPay Features",
											comment: "I didn't know about these features. Thanks!",
											date: "2023-05-14",
										},
									].map((comment) => (
										<Card key={comment.id}>
											<CardContent className="p-4">
												<div className="flex justify-between items-start">
													<div>
														<p className="font-medium">{comment.author}</p>
														<p className="text-sm text-muted-foreground">
															On: {comment.post}
														</p>
														<p className="mt-2">{comment.comment}</p>
													</div>
													<div className="flex space-x-2">
														<Button variant="outline" size="sm">
															Approve
														</Button>
														<Button variant="destructive" size="sm">
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
												<p className="text-xs text-muted-foreground mt-2">{comment.date}</p>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="settings">
						<Card>
							<CardHeader>
								<CardTitle>System Settings</CardTitle>
								<CardDescription>Configure system-wide settings</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium mb-4">General Settings</h3>
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Maintenance Mode</p>
													<p className="text-sm text-muted-foreground">
														Temporarily disable the website for maintenance
													</p>
												</div>
												<Switch />
											</div>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">User Registration</p>
													<p className="text-sm text-muted-foreground">
														Allow new user registrations
													</p>
												</div>
												<Switch defaultChecked />
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-medium mb-4">About Us Page Content</h3>
										<div className="space-y-4">
											<div>
												<Label htmlFor="companyMission">Company Mission</Label>
												<Textarea
													id="companyMission"
													defaultValue="Menjadi platform teknologi terdepan yang memberdayakan bisnis di seluruh Indonesia untuk berkembang dalam era digital, dengan solusi yang inovatif, terpercaya, dan berkelanjutan."
												/>
											</div>
											<div>
												<Label htmlFor="companyVision">Company Vision</Label>
												<Textarea
													id="companyVision"
													defaultValue="Mengembangkan solusi teknologi yang mudah digunakan dan memberikan nilai nyata. Memberikan layanan pelanggan yang luar biasa dan dukungan teknis yang responsif. Terus berinovasi untuk menghadirkan fitur dan teknologi terbaru."
												/>
											</div>
											<div>
												<Label htmlFor="companyValues">Company Values</Label>
												<Textarea
													id="companyValues"
													defaultValue="Integritas: Kami menjunjung tinggi kejujuran dan transparansi dalam setiap interaksi. Inovasi: Terus mengembangkan solusi terdepan untuk tantangan bisnis modern. Kolaborasi: Bekerja sama erat dengan klien untuk mencapai kesuksesan bersama. Kualitas: Menyediakan produk dan layanan terbaik untuk memenuhi harapan klien."
												/>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-medium mb-4">API Settings</h3>
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">API Rate Limiting</p>
													<p className="text-sm text-muted-foreground">
														Limit API requests per hour
													</p>
												</div>
												<Switch defaultChecked />
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<Label htmlFor="rateLimit">Requests per hour</Label>
													<Input id="rateLimit" type="number" defaultValue="1000" />
												</div>
												<div>
													<Label htmlFor="burstLimit">Burst limit</Label>
													<Input id="burstLimit" type="number" defaultValue="50" />
												</div>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-medium mb-4">SEO Settings</h3>
										<div className="space-y-4">
											<div>
												<Label htmlFor="siteTitle">Site Title</Label>
												<Input id="siteTitle" defaultValue="MogiApp - Business Solutions" />
											</div>
											<div>
												<Label htmlFor="siteDescription">Site Description</Label>
												<Textarea
													id="siteDescription"
													defaultValue="Comprehensive business solutions for modern enterprises"
												/>
											</div>
										</div>
									</div>

									<Button>
										<Save className="mr-2 h-4 w-4" />
										Save Settings
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="api">
						<ApiManagement />
					</TabsContent>
				</Tabs>
			</div>
			<LoadingOverlay isLoading={loading} />
		</div>
	)
}

export default Admin
