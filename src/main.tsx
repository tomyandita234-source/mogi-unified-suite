import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "./index.css"

// Preload critical resources
const preloadResources = () => {
	// Preload hero image
	const heroImage = new Image()
	heroImage.src = "/src/assets/hero-image.jpg"

	// Preload logo
	const logo = new Image()
	logo.src = "/src/assets/mogi-pos-logo.png"

	// Preconnect to API server
	const link = document.createElement("link")
	link.rel = "preconnect"
	link.href = import.meta.env.VITE_API_URL || "http://localhost:5000"
	document.head.appendChild(link)
}

// Preload resources when the page loads
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", preloadResources)
} else {
	preloadResources()
}

createRoot(document.getElementById("root")!).render(<App />)
