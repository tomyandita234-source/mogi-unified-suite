import { toast } from "@/hooks/use-toast"

// Error handling utility functions
export const handleApiError = (error: any, defaultMessage: string = "An error occurred") => {
  console.error("API Error:", error)
  
  let message = defaultMessage
  
  // Handle different types of errors
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        message = error.response.data?.message || "Bad Request"
        break
      case 401:
        message = error.response.data?.message || "Unauthorized access"
        break
      case 403:
        message = error.response.data?.message || "Access forbidden"
        break
      case 404:
        message = error.response.data?.message || "Resource not found"
        break
      case 422:
        message = error.response.data?.message || "Validation error"
        break
      case 500:
        message = error.response.data?.message || "Internal server error"
        break
      default:
        message = error.response.data?.message || `Server error: ${error.response.status}`
    }
  } else if (error.request) {
    // Network error
    message = "Network error. Please check your connection."
  } else if (error.message) {
    // Other errors
    message = error.message
  }
  
  // Show error toast
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
  })
  
  return message
}

// Success message handler
export const showSuccessMessage = (title: string, message: string) => {
  toast({
    title: title,
    description: message,
  })
}

// Validation error handler
export const handleValidationError = (errors: Record<string, string>) => {
  Object.values(errors).forEach(error => {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: error,
    })
  })
}

// Form error handler
export const handleFormError = (error: any) => {
  if (error.errors) {
    // Handle validation errors from server
    handleValidationError(error.errors)
  } else {
    // Handle general form errors
    handleApiError(error, "Form submission failed")
  }
}