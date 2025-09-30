import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	ShoppingCart,
	CreditCard,
	Settings,
	Truck,
	FileSignature,
	BookOpen,
	GraduationCap,
	Activity,
	Camera,
	Check,
} from "lucide-react"

const Solutions = () => {
	const solutions = [
		{
			id: "pos",
			name: "Mogi POS",
			icon: ShoppingCart,
			description: "Solusi Point of Sale lengkap untuk bisnis ritel dan restoran",
			features: [
				"Transaksi cepat & akurat",
				"Manajemen stok otomatis",
				"Laporan penjualan real-time",
				"Multi-outlet support",
				"Payment gateway terintegrasi",
			],
			color: "from-cyan-500 to-blue-500",
		},
		{
			id: "pay",
			name: "MogiPay",
			icon: CreditCard,
			description: "Payment gateway terintegrasi untuk transaksi digital",
			features: [
				"Multi payment gateway",
				"Keamanan tingkat bank",
				"Real-time transaction",
				"API integration ready",
				"Fraud detection system",
			],
			color: "from-green-500 to-emerald-500",
		},
		{
			id: "ops",
			name: "Mogi Ops",
			icon: Settings,
			description: "Manajemen operasional untuk efisiensi bisnis",
			features: [
				"Real-time project tracking",
				"Team scheduling & assignment",
				"Automated reporting",
				"Performance analytics",
				"Integration dengan Mogi POS",
			],
			color: "from-purple-500 to-pink-500",
		},
		{
			id: "fleet",
			name: "Mogi Fleet",
			icon: Truck,
			description: "Solusi manajemen armada dan tracking kendaraan",
			features: [
				"Real-time GPS tracking",
				"Fuel consumption monitoring",
				"Route optimization",
				"Speed limit alerts",
				"Remote engine control",
			],
			color: "from-orange-500 to-red-500",
		},
		{
			id: "sign",
			name: "MogiSign",
			icon: FileSignature,
			description: "Platform tanda tangan elektronik",
			features: [
				"Digital signature verification",
				"Encrypted document storage",
				"Audit trail lengkap",
				"Multi-platform support",
				"Legal compliance",
			],
			color: "from-blue-500 to-indigo-500",
		},
		{
			id: "library",
			name: "Mogi Library",
			icon: BookOpen,
			description: "Sistem manajemen perpustakaan digital",
			features: [
				"Digital catalog management",
				"Member registration system",
				"Book lending & return tracking",
				"Fine calculation automatic",
				"Digital library access",
			],
			color: "from-teal-500 to-cyan-500",
		},
		{
			id: "kampuz",
			name: "Mogi Kampuz",
			icon: GraduationCap,
			description: "Platform manajemen kampus terintegrasi",
			features: [
				"Student information system",
				"Academic scheduling",
				"Grade management",
				"Online learning platform",
				"Campus resource booking",
			],
			color: "from-blue-600 to-purple-600",
		},
		{
			id: "dynamics",
			name: "Mogi Dynamics",
			icon: Activity,
			description: "Solusi monitoring & integrasi sistem",
			features: [
				"Real-time system monitoring",
				"API integration hub",
				"Performance analytics",
				"Alert & notification system",
				"Data synchronization",
			],
			color: "from-pink-500 to-rose-500",
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
					<div className="container-width text-center">
						<Badge className="mb-4">Solusi Kami</Badge>
						<h1 className="heading-xxl text-foreground mb-6">Solusi Terintegrasi untuk Bisnis Anda</h1>
						<p className="body-lg text-muted-foreground max-w-3xl mx-auto mb-10">
							Platform lengkap yang dirancang untuk memenuhi kebutuhan bisnis Anda di era digital, dari
							manajemen operasional hingga layanan pelanggan.
						</p>
					</div>
				</section>

				{/* Solutions Grid */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{solutions.map((solution) => {
								const IconComponent = solution.icon
								return (
									<Card
										key={solution.id}
										className="hover:shadow-lg transition-all duration-300 border-border"
									>
										<CardHeader>
											<div
												className={`w-12 h-12 rounded-lg ${solution.color} flex items-center justify-center mb-4`}
											>
												<IconComponent className="h-6 w-6 text-white" />
											</div>
											<CardTitle className="text-xl">{solution.name}</CardTitle>
											<CardDescription>{solution.description}</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className="space-y-2">
												{solution.features.map((feature, index) => (
													<li key={index} className="flex items-start gap-2">
														<Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
														<span className="text-sm text-foreground">{feature}</span>
													</li>
												))}
											</ul>
											<Button
												variant="outline"
												className="w-full mt-6"
												onClick={() => (window.location.href = `/product/${solution.id}`)}
											>
												Pelajari Lebih Lanjut
											</Button>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</div>
				</section>

				{/* Integration Benefits */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Keunggulan Integrasi</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Semua solusi kami dirancang untuk bekerja secara terintegrasi, memberikan efisiensi
								maksimal untuk bisnis Anda.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Settings className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Single Sign-On</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Akses semua solusi dengan satu akun, memudahkan manajemen pengguna dan keamanan
										data.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Activity className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Data Synchronization</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Data secara otomatis disinkronkan antar solusi, menghilangkan kebutuhan input
										data ganda.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<FileSignature className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Unified Reporting</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Dashboard analitik terpadu yang memberikan wawasan menyeluruh tentang kinerja
										bisnis Anda.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
							<h2 className="heading-xl text-white mb-4">Siap Mengoptimalkan Bisnis Anda?</h2>
							<p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
								Bergabunglah dengan ribuan bisnis yang telah mempercayai solusi kami untuk
								mengoptimalkan operasional mereka.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button className="btn-primary-contrast" size="lg">
									Jadwalkan Demo
								</Button>
								<Button
									variant="outline"
									className="bg-white/10 border-white/20 text-white hover:bg-white/20"
									onClick={() => (window.location.href = "/contact")}
								>
									Hubungi Sales
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

export default Solutions
