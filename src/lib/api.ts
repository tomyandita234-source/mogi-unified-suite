// API configuration and utility functions
import { handleApiError } from "@/utils/errorHandler"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`

	try {
		const response = await fetch(url, {
			...options,
			headers: {
				"Content-Type": "application/json",
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

		return await response.json()
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		handleApiError(error, `Failed to fetch data from ${endpoint}`)
		throw error
	}
}

// Generic fetch function with FormData support for file uploads
async function fetchAPIWithFile<T>(endpoint: string, formData: FormData, method: string = "POST"): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`

	try {
		const response = await fetch(url, {
			method,
			body: formData,
			// Don't set Content-Type header, let browser set it with boundary
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

		return await response.json()
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
	createdAt: string
	updatedAt: string
}

export const BlogAPI = {
	getAll: () => fetchAPI<Blog[]>("/api/blogs"),
	getById: (id: string) => fetchAPI<Blog>(`/api/blogs/${id}`),
	getBySlug: (slug: string) => fetchAPI<Blog>(`/api/blogs/slug/${slug}`),
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
	createdAt: string
	updatedAt: string
}

export const ProductAPI = {
	getAll: () => fetchAPI<Product[]>("/api/products"),
	getById: (id: string) => fetchAPI<Product>(`/api/products/${id}`),
	getBySlug: (slug: string) => fetchAPI<Product>(`/api/products/slug/${slug}`),
	getByCategory: (category: string) => fetchAPI<Product[]>(`/api/products/category/${category}`),
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
				if (typeof value === "object") {
					formData.append(key, JSON.stringify(value))
				} else {
					formData.append(key, value as string)
				}
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
				if (typeof value === "object") {
					formData.append(key, JSON.stringify(value))
				} else {
					formData.append(key, value as string)
				}
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

// User API
export interface User {
	_id: string
	username: string
	email: string
	role: string
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
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
	// Admin functions
	getAllUsers: () => fetchAPI<User[]>("/api/users"),
	getUserById: (id: string) => fetchAPI<User>(`/api/users/${id}`),
	updateUser: (id: string, data: Partial<User>) =>
		fetchAPI<User>(`/api/users/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	deleteUser: (id: string) =>
		fetchAPI<{ message: string }>(`/api/users/${id}`, {
			method: "DELETE",
		}),
}

// Contact API
export interface ContactForm {
	name: string
	email: string
	phone?: string
	message: string
}

export interface ContactMessage extends ContactForm {
	_id: string
	createdAt: string
}

export const ContactAPI = {
	send: (data: ContactForm) =>
		fetchAPI<{ success: boolean; message: string }>("/api/contact", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	// Admin functions
	getAll: () => fetchAPI<ContactMessage[]>("/api/contact"),
	getById: (id: string) => fetchAPI<ContactMessage>(`/api/contact/${id}`),
	delete: (id: string) =>
		fetchAPI<{ success: boolean; message: string }>(`/api/contact/${id}`, {
			method: "DELETE",
		}),
}

export default {
	blog: BlogAPI,
	product: ProductAPI,
	user: UserAPI,
	contact: ContactAPI,
}
