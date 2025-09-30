import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
	ArrowLeft,
	Check,
	ArrowRight,
	ShoppingCart,
	Settings,
	Truck,
	FileSignature,
	CreditCard,
	BookOpen,
	GraduationCap,
	Activity,
	Camera,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ProductAPI } from "@/lib/api"
import type { Product } from "@/lib/api"

// Import logos
import mogiPosLogo from "@/assets/mogi-pos-logo.png"
import mogiOpsLogo from "@/assets/mogi-ops-logo.png"
import mogiSignLogo from "@/assets/mogi-sign-logo.png"
import mogiPayLogo from "@/assets/mogi-pay-logo.png"
import mogiLibraryLogo from "@/assets/mogi-library-logo.png"
import mogiKampuzLogo from "@/assets/mogi-kampuz-logo.png"
import mogiDynamicsLogo from "@/assets/mogi-dynamics-logo.png"
import mogiStudioLogo from "@/assets/mogi-studio-logo.png"

const ProductDetail = () => {
	const { productId } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Map product categories to logos
	const logoMap: Record<string, string> = {
		pos: mogiPosLogo,
		pay: mogiPayLogo,
		ops: mogiOpsLogo,
		fleet: mogiPosLogo,
		sign: mogiSignLogo,
		library: mogiLibraryLogo,
		kampuz: mogiKampuzLogo,
		dynamics: mogiDynamicsLogo,
		studio: mogiStudioLogo,
	}

	// Map product categories to icons
	const iconMap: Record<string, React.ComponentType<any>> = {
		pos: ShoppingCart,
		pay: CreditCard,
		ops: Settings,
		fleet: Truck,
		sign: FileSignature,
		library: BookOpen,
		kampuz: GraduationCap,
		dynamics: Activity,
		studio: Camera,
	}

	// Map product categories to colors
	const colorMap: Record<string, string> = {
		pos: "from-cyan-500 to-blue-500",
		pay: "from-green-500 to-emerald-500",
		ops: "from-purple-500 to-pink-500",
		fleet: "from-orange-500 to-red-500",
		sign: "from-blue-500 to-indigo-500",
		library: "from-teal-500 to-cyan-500",
		kampuz: "from-blue-600 to-purple-600",
		dynamics: "from-pink-500 to-rose-500",
		studio: "from-violet-500 to-purple-500",
	}

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true)
				setError(null)

				if (!productId) {
					throw new Error("Product ID is required")
				}

				// Fetch product from API
				const fetchedProduct = await ProductAPI.getBySlug(productId)
				setProduct(fetchedProduct)
			} catch (err: any) {
				console.error("Error fetching product:", err)
				setError(err.message || "Failed to fetch product details")
				// Navigate to 404 if product not found
				if (err.message && err.message.includes("not found")) {
					navigate("/404")
				}
			} finally {
				setLoading(false)
			}
		}

		fetchProduct()
	}, [productId, navigate])

	if (loading) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16 flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
						<p className="mt-4 text-lg text-foreground">Loading product details...</p>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Product</h1>
							<p className="text-muted-foreground mb-8">{error}</p>
							<Button onClick={() => navigate(-1)}>Go Back</Button>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	if (!product) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="pt-16">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
							<p className="text-muted-foreground mb-8">
								The product you're looking for doesn't exist or has been removed.
							</p>
							<Button onClick={() => navigate("/")}>Go Home</Button>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	// Parse JSON fields if they're strings
	const features = typeof product.features === "string" ? JSON.parse(product.features) : product.features
	const benefits = typeof product.benefits === "string" ? JSON.parse(product.benefits) : product.benefits
	const pricing = typeof product.pricing === "string" ? JSON.parse(product.pricing) : product.pricing

	const IconComponent = iconMap[product.category] || ShoppingCart
	const logo = logoMap[product.category] || mogiPosLogo
	const color = colorMap[product.category] || "from-cyan-500 to-blue-500"

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2">
							<ArrowLeft className="h-4 w-4" />
							Kembali ke Produk
						</Button>

						<div className="flex flex-col md:flex-row gap-8 items-center">
							<div className="md:w-1/3 flex justify-center">
								<div>
									<img src={logo} alt={`${product.name} Logo`} className="h-48 w-auto" />
								</div>
							</div>

							<div className="md:w-2/3">
								<div>
									<h1 className="heading-xxl text-foreground mb-4">{product.name}</h1>
									<p className="heading-md text-primary mb-6">
										{product.category === "pos" && "Point of Sale Solution"}
										{product.category === "pay" && "Payment Gateway Solution"}
										{product.category === "ops" && "Operations Management"}
										{product.category === "fleet" && "Fleet Management System"}
										{product.category === "sign" && "Digital Signature Platform"}
										{product.category === "library" && "Library Management System"}
										{product.category === "kampuz" && "Campus Management System"}
										{product.category === "dynamics" && "Monitoring & Integration Solutions"}
										{product.category === "studio" && "Content Creation Platform"}
									</p>
									<p className="body-lg text-muted-foreground mb-8">
										{product.longDescription || product.description}
									</p>

									<div className="flex flex-wrap gap-4">
										<Button className="btn-primary">Coba Demo Gratis</Button>
										<Button variant="outline">Hubungi Sales</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/5">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="section-title">Fitur Utama</h2>
							<p className="section-subtitle">Solusi lengkap untuk kebutuhan bisnis Anda</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{Array.isArray(features) &&
								features.map((feature: string, index: number) => (
									<div
										key={index}
										className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border"
									>
										<div
											className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}
										>
											<Check className="h-4 w-4 text-white" />
										</div>
										<p className="body-md text-foreground">{feature}</p>
									</div>
								))}
						</div>
					</div>
				</section>

				{/* Benefits Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="section-title">Manfaat Utama</h2>
							<p className="section-subtitle">Dampak positif yang akan Anda dapatkan</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array.isArray(benefits) &&
								benefits.map((benefit: string, index: number) => (
									<div
										key={index}
										className="bg-background p-6 rounded-xl border border-border text-center"
									>
										<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
											<Check className="h-6 w-6 text-primary" />
										</div>
										<p className="body-md text-foreground">{benefit}</p>
									</div>
								))}
						</div>
					</div>
				</section>

				{/* Pricing Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/5">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="section-title">Pilihan Paket</h2>
							<p className="section-subtitle">Sesuaikan dengan kebutuhan bisnis Anda</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{["basic", "pro", "enterprise"].map((plan, index) => (
								<div
									key={plan}
									className="bg-background rounded-2xl border border-border overflow-hidden"
								>
									<div className={`h-2 ${color}`}></div>
									<div className="p-8">
										<h3 className="heading-md mb-2 capitalize">{plan}</h3>
										<div className="mb-6">
											<span className="heading-lg text-foreground">
												{pricing && pricing[plan] ? pricing[plan].price : "Custom"}
											</span>
											{plan !== "enterprise" && pricing && pricing[plan] && (
												<span className="body-sm text-muted-foreground">
													{pricing[plan].period || "/bulan"}
												</span>
											)}
										</div>
										<Button
											className="w-full mb-6"
											variant={plan === "pro" ? "default" : "outline"}
										>
											{plan === "enterprise" ? "Hubungi Kami" : "Pilih Paket"}
										</Button>
										<ul className="space-y-4">
											{Array.isArray(features) &&
												features
													.slice(
														0,
														plan === "basic" ? 4 : plan === "pro" ? 6 : features.length
													)
													.map((feature: string, idx: number) => (
														<li key={idx} className="flex items-center gap-3">
															<Check className="h-4 w-4 text-primary flex-shrink-0" />
															<span className="body-sm text-foreground">{feature}</span>
														</li>
													))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
							<h2 className="heading-xl text-white mb-4">Siap Meningkatkan Efisiensi Bisnis Anda?</h2>
							<p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
								Bergabunglah dengan ribuan bisnis yang telah mempercayai solusi kami untuk
								mengoptimalkan operasional mereka.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button className="btn-primary-contrast" size="lg">
									Mulai Sekarang
								</Button>
								<Button
									variant="outline"
									className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								>
									Jadwalkan Demo
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}

export default ProductDetail
