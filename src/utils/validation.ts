// Validation utility functions

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation regex (Indonesian format)
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,10}$/

// Username validation regex (alphanumeric and underscore, 3-20 characters)
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/

// Password validation (at least 6 characters)
const PASSWORD_REGEX = /^.{6,}$/

// Validation error interface
export interface ValidationError {
	field: string
	message: string
}

// Validation result interface
export interface ValidationResult {
	isValid: boolean
	errors: ValidationError[]
}

// Validate email
export const validateEmail = (email: string): ValidationError | null => {
	if (!email) {
		return { field: "email", message: "Email is required" }
	}
	
	if (!EMAIL_REGEX.test(email)) {
		return { field: "email", message: "Invalid email format" }
	}
	
	return null
}

// Validate phone number
export const validatePhone = (phone: string): ValidationError | null => {
	if (phone && !PHONE_REGEX.test(phone)) {
		return { field: "phone", message: "Invalid phone number format" }
	}
	
	return null
}

// Validate username
export const validateUsername = (username: string): ValidationError | null => {
	if (!username) {
		return { field: "username", message: "Username is required" }
	}
	
	if (!USERNAME_REGEX.test(username)) {
		return { field: "username", message: "Username must be 3-20 characters and contain only letters, numbers, and underscores" }
	}
	
	return null
}

// Validate password
export const validatePassword = (password: string): ValidationError | null => {
	if (!password) {
		return { field: "password", message: "Password is required" }
	}
	
	if (!PASSWORD_REGEX.test(password)) {
		return { field: "password", message: "Password must be at least 6 characters long" }
	}
	
	return null
}

// Validate required field
export const validateRequired = (value: string, fieldName: string, displayName: string): ValidationError | null => {
	if (!value || !value.trim()) {
		return { field: fieldName, message: `${displayName} is required` }
	}
	
	return null
}

// Validate min length
export const validateMinLength = (value: string, minLength: number, fieldName: string, displayName: string): ValidationError | null => {
	if (value && value.length < minLength) {
		return { field: fieldName, message: `${displayName} must be at least ${minLength} characters long` }
	}
	
	return null
}

// Validate max length
export const validateMaxLength = (value: string, maxLength: number, fieldName: string, displayName: string): ValidationError | null => {
	if (value && value.length > maxLength) {
		return { field: fieldName, message: `${displayName} must be no more than ${maxLength} characters long` }
	}
	
	return null
}

// Validate URL
export const validateUrl = (url: string, fieldName: string, displayName: string): ValidationError | null => {
	if (url) {
		try {
			new URL(url)
		} catch (e) {
			return { field: fieldName, message: `${displayName} must be a valid URL` }
		}
	}
	
	return null
}

// Validate slug
export const validateSlug = (slug: string): ValidationError | null => {
	if (!slug) {
		return { field: "slug", message: "Slug is required" }
	}
	
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
	if (!slugRegex.test(slug)) {
		return { field: "slug", message: "Slug must contain only lowercase letters, numbers, and hyphens" }
	}
	
	return null
}

// Validate product category
export const validateProductCategory = (category: string): ValidationError | null => {
	const validCategories = [
		"pos", "pay", "ops", "fleet", "sign", 
		"library", "kampuz", "dynamics", "studio"
	]
	
	if (!category) {
		return { field: "category", message: "Category is required" }
	}
	
	if (!validCategories.includes(category)) {
		return { field: "category", message: "Invalid category" }
	}
	
	return null
}

// Validate blog content
export const validateBlogContent = (content: string): ValidationError | null => {
	if (!content) {
		return { field: "body", message: "Content is required" }
	}
	
	if (content.length < 10) {
		return { field: "body", message: "Content must be at least 10 characters long" }
	}
	
	return null
}

// Validate contact form
export const validateContactForm = (data: {
	name: string
	email: string
	phone?: string
	message: string
}): ValidationResult => {
	const errors: ValidationError[] = []
	
	// Validate name
	const nameError = validateRequired(data.name, "name", "Name")
	if (nameError) errors.push(nameError)
	
	// Validate email
	const emailError = validateEmail(data.email)
	if (emailError) errors.push(emailError)
	
	// Validate phone if provided
	if (data.phone) {
		const phoneError = validatePhone(data.phone)
		if (phoneError) errors.push(phoneError)
	}
	
	// Validate message
	const messageError = validateRequired(data.message, "message", "Message")
	if (messageError) errors.push(messageError)
	
	// Validate message length
	const messageLengthError = validateMinLength(data.message, 10, "message", "Message")
	if (messageLengthError) errors.push(messageLengthError)
	
	return {
		isValid: errors.length === 0,
		errors
	}
}

// Validate user registration
export const validateUserRegistration = (data: {
	username: string
	email: string
	password: string
}): ValidationResult => {
	const errors: ValidationError[] = []
	
	// Validate username
	const usernameError = validateUsername(data.username)
	if (usernameError) errors.push(usernameError)
	
	// Validate email
	const emailError = validateEmail(data.email)
	if (emailError) errors.push(emailError)
	
	// Validate password
	const passwordError = validatePassword(data.password)
	if (passwordError) errors.push(passwordError)
	
	return {
		isValid: errors.length === 0,
		errors
	}
}

// Validate product form
export const validateProductForm = (data: {
	name: string
	slug: string
	description: string
	category: string
}): ValidationResult => {
	const errors: ValidationError[] = []
	
	// Validate name
	const nameError = validateRequired(data.name, "name", "Product name")
	if (nameError) errors.push(nameError)
	
	// Validate slug
	const slugError = validateSlug(data.slug)
	if (slugError) errors.push(slugError)
	
	// Validate description
	const descriptionError = validateRequired(data.description, "description", "Description")
	if (descriptionError) errors.push(descriptionError)
	
	// Validate category
	const categoryError = validateProductCategory(data.category)
	if (categoryError) errors.push(categoryError)
	
	return {
		isValid: errors.length === 0,
		errors
	}
}

// Validate blog form
export const validateBlogForm = (data: {
	title: string
	slug: string
	body: string
}): ValidationResult => {
	const errors: ValidationError[] = []
	
	// Validate title
	const titleError = validateRequired(data.title, "title", "Title")
	if (titleError) errors.push(titleError)
	
	// Validate slug
	const slugError = validateSlug(data.slug)
	if (slugError) errors.push(slugError)
	
	// Validate body
	const bodyError = validateBlogContent(data.body)
	if (bodyError) errors.push(bodyError)
	
	return {
		isValid: errors.length === 0,
		errors
	}
}