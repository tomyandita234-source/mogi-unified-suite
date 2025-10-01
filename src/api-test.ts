import { UserAPI } from "@/lib/api"

async function testAPI() {
	try {
		console.log("Testing API connection...")

		// Test unauthenticated endpoint
		try {
			await UserAPI.getProfile()
			console.log("Profile endpoint accessible (unexpected - should require auth)")
		} catch (error) {
			console.log("Profile endpoint correctly requires authentication:", error.message)
		}

		console.log("API test completed")
	} catch (error) {
		console.error("API test failed:", error)
	}
}

testAPI()
