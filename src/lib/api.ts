// API configuration and utility functions
import { handleApiError } from "@/utils/errorHandler"

// Use relative URLs for proxy support in development
// In production, this will use the full API URL from environment variables
const API_BASE_URL =
	import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_API_URL || "http://localhost:5000"

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`

	// Get token from localStorage if available
	const token = localStorage.getItem("token")

	try {
		const response = await fetch(url, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
				...options.headers,
			},
		})

		if (!response.ok) {
			// Try to parse error response
			let errorMessage = `API error: ${response.status} ${response.statusText}`
			try {
				const errorData = await response.json()
				errorMessage = errorData.message || errorData.error || errorMessage
			} catch (e) {
				// If we can't parse JSON, use the default message
			}
			throw new Error(errorMessage)
		}

		const data = await response.json()

		// Transform the data to map 'id' to '_id' for compatibility
		if (Array.isArray(data)) {
			return data.map((item) => transformIdField(item)) as T
		} else {
			return transformIdField(data) as T
		}
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		handleApiError(error, `Failed to fetch data from ${endpoint}`)
		throw error
	}
}

// Helper function to transform 'id' to '_id'
function transformIdField(obj: any): any {
	if (obj === null || typeof obj !== "object") {
		return obj
	}

	// Create a new object with _id property if id exists
	if (obj.hasOwnProperty("id")) {
		const { id, ...rest } = obj
		return { _id: id.toString(), ...rest }
	}

	// Recursively transform nested objects
	const transformed: any = {}
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			transformed[key] = transformIdField(obj[key])
		}
	}

	return transformed
}

// Generic fetch function with FormData support for file uploads
async function fetchAPIWithFile<T>(endpoint: string, formData: FormData, method: string = "POST"): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`

	// Get token from localStorage if available
	const token = localStorage.getItem("token")

	try {
		const response = await fetch(url, {
			method,
			body: formData,
			// Don't set Content-Type header, let browser set it with boundary
			headers: {
				...(token && { Authorization: `Bearer ${token}` }),
			},
		})

		if (!response.ok) {
			// Try to parse error response
			let errorMessage = `API error: ${response.status} ${response.statusText}`
			try {
				const errorData = await response.json()
				errorMessage = errorData.message || errorData.error || errorMessage
			} catch (e) {
				// If we can't parse JSON, use the default message
			}
			throw new Error(errorMessage)
		}

		const data = await response.json()

		// Transform the data to map 'id' to '_id' for compatibility
		if (Array.isArray(data)) {
			return data.map((item) => transformIdField(item)) as T
		} else {
			return transformIdField(data) as T
		}
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		handleApiError(error, `Failed to upload file to ${endpoint}`)
		throw error
	}
}

// Blog API
export interface Blog {
	_id: string
	title: string
	slug: string
	body: string
	image: string
	images_alt: string
	images_source: string
	createdBy: string
	source: string
	isShow: boolean
	productId?: string // Optional reference to Product
	product?: Product // Optional product data
	createdAt: string
	updatedAt: string
}

export const BlogAPI = {
	getAll: () => fetchAPI<Blog[]>("/api/blogs"),
	getById: (id: string) => fetchAPI<Blog>(`/api/blogs/${id}`),
	getBySlug: (slug: string) => fetchAPI<Blog>(`/api/blogs/slug/${slug}`),
	getByProductId: (productId: string) => fetchAPI<Blog[]>(`/api/blogs/product/${productId}`),
	create: (data: Partial<Blog>) =>
		fetchAPI<Blog>("/api/blogs", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	createWithImage: (data: Partial<Blog>, imageFile: File) => {
		const formData = new FormData()

		// Append all blog data as individual fields
		Object.keys(data).forEach((key) => {
			const value = data[key as keyof Blog]
			if (value !== undefined && value !== null) {
				formData.append(key, value as string)
			}
		})

		// Append image file
		formData.append("image", imageFile)

		return fetchAPIWithFile<Blog>("/api/blogs", formData, "POST")
	},
	update: (id: string, data: Partial<Blog>) =>
		fetchAPI<Blog>(`/api/blogs/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	updateWithImage: (id: string, data: Partial<Blog>, imageFile: File) => {
		const formData = new FormData()

		// Append all blog data as individual fields
		Object.keys(data).forEach((key) => {
			const value = data[key as keyof Blog]
			if (value !== undefined && value !== null) {
				formData.append(key, value as string)
			}
		})

		// Append image file
		formData.append("image", imageFile)

		return fetchAPIWithFile<Blog>(`/api/blogs/${id}`, formData, "PUT")
	},
	delete: (id: string) =>
		fetchAPI<{ success: boolean }>(`/api/blogs/${id}`, {
			method: "DELETE",
		}),
}

// Product API
export interface Product {
	_id: string
	name: string
	slug: string
	description: string
	longDescription: string
	category: string
	features: string[]
	benefits: string[]
	pricing: {
		basic: {
			price: string
			period: string
			features: string[]
		}
		pro: {
			price: string
			period: string
			features: string[]
		}
		enterprise: {
			price: string
			period: string
			features: string[]
		}
	}
	isActive: boolean
	imageUrl: string
	sortOrder: number
	blogs?: Blog[] // Optional blogs data
	createdAt: string
	updatedAt: string
}

export const ProductAPI = {
	getAll: () => fetchAPI<Product[]>("/api/products"),
	getById: (id: string) => fetchAPI<Product>(`/api/products/${id}`),
	getBySlug: (slug: string) => fetchAPI<Product>(`/api/products/slug/${slug}`),
	create: (data: Partial<Product>) =>
		fetchAPI<Product>("/api/products", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	createWithImage: (data: Partial<Product>, imageFile: File) => {
		const formData = new FormData()

		// Append all product data as individual fields
		Object.keys(data).forEach((key) => {
			const value = data[key as keyof Product]
			if (value !== undefined && value !== null) {
				formData.append(key, value as string)
			}
		})

		// Append image file
		formData.append("image", imageFile)

		return fetchAPIWithFile<Product>("/api/products", formData, "POST")
	},
	update: (id: string, data: Partial<Product>) =>
		fetchAPI<Product>(`/api/products/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	updateWithImage: (id: string, data: Partial<Product>, imageFile: File) => {
		const formData = new FormData()

		// Append all product data as individual fields
		Object.keys(data).forEach((key) => {
			const value = data[key as keyof Product]
			if (value !== undefined && value !== null) {
				formData.append(key, value as string)
			}
		})

		// Append image file
		formData.append("image", imageFile)

		return fetchAPIWithFile<Product>(`/api/products/${id}`, formData, "PUT")
	},
	delete: (id: string) =>
		fetchAPI<{ success: boolean }>(`/api/products/${id}`, {
			method: "DELETE",
		}),
}

// Career API
export interface Career {
	_id: string
	title: string
	department: string
	location: string
	type: string
	experience: string
	description: string
	requirements: string[]
	isActive: boolean
	sortOrder: number
	createdAt: string
	updatedAt: string
}

export const CareerAPI = {
	getAll: () => fetchAPI<Career[]>("/api/careers"),
	getById: (id: string) => fetchAPI<Career>(`/api/careers/${id}`),
	create: (data: Partial<Career>) =>
		fetchAPI<Career>("/api/careers", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	update: (id: string, data: Partial<Career>) =>
		fetchAPI<Career>(`/api/careers/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	delete: (id: string) =>
		fetchAPI<{ success: boolean }>(`/api/careers/${id}`, {
			method: "DELETE",
		}),
}

// User API
export interface User {
	_id: string
	username: string
	email: string
	role: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export const UserAPI = {
	login: (username: string, password: string) =>
		fetchAPI<{ token: string; user: User }>("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
		}),
	register: (username: string, email: string, password: string) =>
		fetchAPI<{ token: string; user: User }>("/api/users/register", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
		}),
	getProfile: () => fetchAPI<User>("/api/users/profile"),
	updateProfile: (data: Partial<User>) =>
		fetchAPI<User>("/api/users/profile", {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	getAllUsers: () => fetchAPI<User[]>("/api/users"),
	getUserById: (id: string) => fetchAPI<User>(`/api/users/${id}`),
	updateUser: (id: string, data: Partial<User>) =>
		fetchAPI<User>(`/api/users/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	deleteUser: (id: string) =>
		fetchAPI<{ success: boolean }>(`/api/users/${id}`, {
			method: "DELETE",
		}),
	resetUserPassword: (id: string) =>
		fetchAPI<{ newPassword: string }>("/api/users/reset-password", {
			method: "POST",
			body: JSON.stringify({ userId: id }),
		}),
}

// Contact API
export interface ContactMessage {
	_id: string
	name: string
	email: string
	phone?: string
	message: string
	createdAt: string
}

export const ContactAPI = {
	getAll: () => fetchAPI<ContactMessage[]>("/api/contact"),
	getById: (id: string) => fetchAPI<ContactMessage>(`/api/contact/${id}`),
	send: (data: Omit<ContactMessage, "_id" | "createdAt">) =>
		fetchAPI<ContactMessage>("/api/contact", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	delete: (id: string) =>
		fetchAPI<{ success: boolean }>(`/api/contact/${id}`, {
			method: "DELETE",
		}),
}

// Analytics API
export interface DashboardStats {
	totalBlogs: number
	totalProducts: number
	totalContacts: number
	unreadContacts: number
	recentBlogs: number
	activeProducts: number
	totalUsers: number
	recentUsers: number
}

export const AnalyticsAPI = {
	getDashboardStats: () => fetchAPI<{ stats: DashboardStats }>("/api/analytics/dashboard"),
	getBlogAnalytics: () => fetchAPI<any>("/api/analytics/blogs"),
	getProductAnalytics: () => fetchAPI<any>("/api/analytics/products"),
	getUserAnalytics: () => fetchAPI<any>("/api/analytics/users"),
}

// External API
export const ExternalAPI = {
	generateApiKey: () =>
		fetchAPI<{ message: string; apiKey: string; user: any }>("/api/external/generate-key", {
			method: "POST",
		}),

	getApiKeyInfo: () => fetchAPI<{ user: any }>("/api/external/key-info"),

	revokeApiKey: () =>
		fetchAPI<{ message: string; user: any }>("/api/external/revoke-key", {
			method: "DELETE",
		}),

	// Add this new function for auto blog generation
	generateBlogsFromRss: (sources: Array<{ url: string; name: string; active: boolean }>) =>
		fetchAPI<{ message: string; results: any }>("/api/external/generate-blogs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ sources }),
		}),

	getBlogPosts: (params?: { limit?: number; offset?: number }) => {
		const searchParams = new URLSearchParams()
		if (params?.limit) searchParams.append("limit", params.limit.toString())
		if (params?.offset) searchParams.append("offset", params.offset.toString())
		return fetchAPI<{ blogs: Blog[]; total: number; limit: number; offset: number }>(
			`/api/external/blogs?${searchParams.toString()}`
		)
	},

	getProducts: (params?: { limit?: number; offset?: number }) => {
		const searchParams = new URLSearchParams()
		if (params?.limit) searchParams.append("limit", params.limit.toString())
		if (params?.offset) searchParams.append("offset", params.offset.toString())
		return fetchAPI<{ products: Product[]; total: number; limit: number; offset: number }>(
			`/api/external/products?${searchParams.toString()}`
		)
	},
}
