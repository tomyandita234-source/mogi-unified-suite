// Simple API test to verify frontend-backend connectivity
import { BlogAPI } from "@/lib/api"

// Test function to verify API connectivity
export async function testApiConnection(): Promise<boolean> {
	try {
		console.log("Testing API connection...")
		const blogs = await BlogAPI.getAll()
		console.log("API connection successful! Retrieved", blogs.length, "blogs")
		return true
	} catch (error) {
		console.error("API connection failed:", error)
		return false
	}
}

// Run the test
testApiConnection().then((success) => {
	if (success) {
		console.log("✅ Frontend successfully connected to backend API")
	} else {
		console.log("❌ Frontend failed to connect to backend API")
	}
})
