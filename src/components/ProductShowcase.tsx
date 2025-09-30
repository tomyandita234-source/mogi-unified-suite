import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap, Shield, Users, Award, HeadphonesIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
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

const ProductShowcase = () => {
	const [products, setProducts] = useState<Product[]>([])
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
		const fetchProducts = async () => {
			try {
				setLoading(true)
				const response = await ProductAPI.getAll()
				setProducts(response)
			} catch (err: any) {
				console.error("Error fetching products:", err)
				setError(err.message || "Failed to fetch products")
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	const whyChooseUs = [
		{
			icon: CheckCircle,
			title: "Solusi Terintegrasi",
			description:
				"Semua produk kami dirancang untuk bekerja secara terintegrasi, memastikan alur kerja yang mulus tanpa perlu alat tambahan.",
		},
		{
			icon: Zap,
			title: "Performa Tinggi",
			description:
				"Platform kami dibangun dengan teknologi terkini untuk memberikan performa maksimal bahkan saat digunakan oleh banyak pengguna sekaligus.",
		},
		{
			icon: Shield,
			title: "Keamanan Enterprise",
			description:
				"Keamanan data adalah prioritas utama kami. Semua produk dilengkapi dengan enkripsi end-to-end dan sertifikasi keamanan internasional.",
		},
		{
			icon: Users,
			title: "Dukungan Profesional",
			description:
				"Tim support kami yang berpengalaman siap membantu Anda 24/7 dengan respon cepat dan solusi yang tepat.",
		},
		{
			icon: Award,
			title: "Kualitas Terjamin",
			description:
				"Produk kami telah diuji dan dipercaya oleh ribuan bisnis di seluruh Indonesia, dari UMKM hingga perusahaan besar.",
		},
		{
			icon: HeadphonesIcon,
			title: "Implementasi Mudah",
			description:
				"Proses implementasi yang cepat dan mudah dengan training yang komprehensif untuk memastikan tim Anda siap menggunakan produk.",
		},
	]

	if (loading) {
		return (
			<section id="produk" className="py-20 px-4 sm:px-6 lg:px-8 section-alt relative overflow-hidden">
				<div className="container-width relative z-10">
					<div className="section-header">
						<h2 className="section-title">Produk Kami</h2>
						<p className="section-subtitle">
							Solusi terintegrasi untuk semua kebutuhan bisnis Anda. Dari Point of Sale hingga manajemen
							armada, semua dalam satu platform.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
						{[1, 2, 3].map((index) => (
							<div
								key={index}
								className="product-card group bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl border border-white/10 animate-pulse"
							>
								<div className="flex items-center gap-4 mb-8">
									<div className="h-16 w-16 bg-gray-300 rounded-full"></div>
									<div>
										<div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
										<div className="h-4 bg-gray-300 rounded w-16"></div>
									</div>
								</div>
								<div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
								<div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
								<div className="space-y-3">
									{[1, 2, 3].map((i) => (
										<div key={i} className="flex items-center gap-3">
											<div className="h-2 w-2 bg-gray-300 rounded-full"></div>
											<div className="h-3 bg-gray-300 rounded w-4/5"></div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section id="produk" className="py-20 px-4 sm:px-6 lg:px-8 section-alt relative overflow-hidden">
				<div className="container-width relative z-10">
					<div className="section-header">
						<h2 className="section-title">Produk Kami</h2>
						<p className="section-subtitle">
							Solusi terintegrasi untuk semua kebutuhan bisnis Anda. Dari Point of Sale hingga manajemen
							armada, semua dalam satu platform.
						</p>
					</div>

					<div className="text-center py-12">
						<p className="text-red-500">Error loading products: {error}</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section id="produk" className="py-20 px-4 sm:px-6 lg:px-8 section-alt relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-16 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-16 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
			</div>

			<div className="container-width relative z-10">
				{/* Section Header */}
				<div className="section-header">
					<h2 className="section-title">Produk Kami</h2>
					<p className="section-subtitle">
						Solusi terintegrasi untuk semua kebutuhan bisnis Anda. Dari Point of Sale hingga manajemen
						armada, semua dalam satu platform.
					</p>
				</div>

				{/* Product Grid - Apple-style minimalist design */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
					{products.map((product) => {
						// Parse JSON fields if they're strings
						const features =
							typeof product.features === "string" ? JSON.parse(product.features) : product.features

						const logo = logoMap[product.category] || mogiPosLogo
						const color = colorMap[product.category] || "from-cyan-500 to-blue-500"

						return (
							<div
								key={product._id}
								className="product-card group bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl border border-white/10"
							>
								{/* Product Header */}
								<div className="flex items-center gap-4 mb-8">
									<div className="relative">
										<img
											src={logo}
											alt={`${product.name} Logo`}
											className="h-16 w-auto transition-smooth group-hover:scale-110"
											loading="lazy"
										/>
									</div>
									<div>
										<h3 className="heading-md text-foreground">{product.name}</h3>
										<p className="body-sm font-semibold text-primary">
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
									</div>
								</div>

								{/* Product Description */}
								<p className="body-md text-muted-foreground mb-8 line-clamp-3">{product.description}</p>

								{/* Features List */}
								<div className="space-y-4 mb-10">
									{Array.isArray(features) &&
										features.slice(0, 5).map((feature: string, featureIndex: number) => (
											<div key={featureIndex} className="flex items-center gap-3">
												<div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
												<span className="body-sm text-foreground">{feature}</span>
											</div>
										))}
								</div>

								{/* CTA Button */}
								<Link to={`/product/${product.slug}`}>
									<Button className="btn-outline w-full group">
										Pelajari Lebih Lanjut
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						)
					})}
				</div>

				{/* Why Choose Us Section */}
				<div className="mt-24">
					<div className="text-center mb-16">
						<h2 className="section-title">Mengapa Memilih Produk Kami</h2>
						<p className="section-subtitle max-w-3xl mx-auto">
							Kami berkomitmen untuk memberikan solusi terbaik yang membantu bisnis Anda tumbuh dan
							berkembang
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{whyChooseUs.map((reason, index) => (
							<div
								key={index}
								className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:shadow-lg transition-all duration-300"
							>
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
									<reason.icon className="h-6 w-6 text-primary" />
								</div>
								<h3 className="heading-sm mb-4">{reason.title}</h3>
								<p className="body-md text-muted-foreground">{reason.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductShowcase
