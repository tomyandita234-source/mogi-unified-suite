import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { lazy, Suspense } from "react"

// Import WhatsApp icon
import waIcon from "@/assets/ic-waba.webp"

// Lazy load pages
const Index = lazy(() => import("./pages/Index"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Blog = lazy(() => import("./pages/Blog"))
const BlogDetail = lazy(() => import("./pages/BlogDetail"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))
const Solutions = lazy(() => import("./pages/Solutions"))
const Support = lazy(() => import("./pages/Support"))
const Careers = lazy(() => import("./pages/Careers"))
const Admin = lazy(() => import("./pages/Admin"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Pricing = lazy(() => import("./pages/Pricing"))

const queryClient = new QueryClient()

// WhatsApp support number (replace with your actual number)
const WHATSAPP_NUMBER = "6281122888001" // This is the number from your ContactSection
const WHATSAPP_MESSAGE = "Halo, saya ingin bertanya tentang produk MogiApp"

const LoadingSpinner = () => (
	<div className="flex items-center justify-center min-h-screen">
		<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
	</div>
)

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Suspense fallback={<LoadingSpinner />}>
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/blog" element={<Blog />} />
							<Route path="/blog/:blogId" element={<BlogDetail />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/about" element={<About />} />
							<Route path="/solutions" element={<Solutions />} />
							<Route path="/support" element={<Support />} />
							<Route path="/careers" element={<Careers />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/product/:productId" element={<ProductDetail />} />
							<Route path="/pricing" element={<Pricing />} />
							{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>

				{/* WhatsApp Floating Button */}
				<a
					href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
					aria-label="Hubungi kami via WhatsApp"
				>
					<img src={waIcon} alt="WhatsApp" className="h-6 w-6" />
				</a>
			</TooltipProvider>
		</ThemeProvider>
	</QueryClientProvider>
)

export default App
