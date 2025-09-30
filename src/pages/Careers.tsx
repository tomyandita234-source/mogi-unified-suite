import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Clock, Users, Heart, Award, TrendingUp, Calendar, Mail, Phone } from "lucide-react"

const Careers = () => {
	const positions = [
		{
			id: 1,
			title: "Senior Frontend Developer",
			department: "Engineering",
			location: "Jakarta, Indonesia",
			type: "Full-time",
			experience: "3+ years",
			description:
				"Bertanggung jawab untuk mengembangkan dan memelihara antarmuka pengguna yang responsif dan menarik menggunakan React dan teknologi modern lainnya.",
			requirements: [
				"Pengalaman dengan React, TypeScript, dan ekosistemnya",
				"Pemahaman mendalam tentang state management (Redux, Context API)",
				"Pengalaman dengan testing (Jest, React Testing Library)",
				"Pemahaman tentang aksesibilitas web dan SEO",
			],
		},
		{
			id: 2,
			title: "Backend Engineer",
			department: "Engineering",
			location: "Remote",
			type: "Full-time",
			experience: "2+ years",
			description:
				"Mengembangkan dan memelihara API dan layanan backend menggunakan Node.js dan database modern.",
			requirements: [
				"Pengalaman dengan Node.js dan Express",
				"Pemahaman tentang database SQL dan NoSQL",
				"Pengalaman dengan RESTful API dan GraphQL",
				"Pemahaman tentang keamanan aplikasi web",
			],
		},
		{
			id: 3,
			title: "UI/UX Designer",
			department: "Design",
			location: "Jakarta, Indonesia",
			type: "Full-time",
			experience: "2+ years",
			description: "Mendesain pengalaman pengguna yang intuitif dan menarik untuk produk digital kami.",
			requirements: [
				"Pengalaman dengan Figma, Sketch, atau Adobe XD",
				"Pemahaman tentang prinsip desain UI/UX",
				"Portofolio yang menunjukkan proses desain",
				"Pengalaman dengan prototyping dan user testing",
			],
		},
		{
			id: 4,
			title: "DevOps Engineer",
			department: "Engineering",
			location: "Remote",
			type: "Full-time",
			experience: "3+ years",
			description: "Mengelola infrastruktur cloud, CI/CD pipelines, dan monitoring sistem.",
			requirements: [
				"Pengalaman dengan Docker dan Kubernetes",
				"Pengalaman dengan AWS, GCP, atau Azure",
				"Pemahaman tentang CI/CD (Jenkins, GitHub Actions)",
				"Pengalaman dengan monitoring tools (Prometheus, Grafana)",
			],
		},
	]

	const benefits = [
		{
			icon: Heart,
			title: "Kesehatan & Kesejahteraan",
			description: "Asuransi kesehatan komprehensif untuk Anda dan keluarga",
		},
		{
			icon: TrendingUp,
			title: "Pertumbuhan Karir",
			description: "Program mentoring dan peluang promosi yang jelas",
		},
		{
			icon: Award,
			title: "Penghargaan Kinerja",
			description: "Bonus tahunan dan penghargaan karyawan terbaik",
		},
		{
			icon: Users,
			title: "Budaya Tim",
			description: "Lingkungan kerja kolaboratif dan inklusif",
		},
		{
			icon: Calendar,
			title: "Fleksibilitas",
			description: "Jam kerja fleksibel dan opsi kerja remote",
		},
		{
			icon: Building,
			title: "Perkantoran Modern",
			description: "Kantor nyaman di lokasi strategis Jakarta",
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
					<div className="container-width text-center">
						<Badge className="mb-4">Karir</Badge>
						<h1 className="heading-xxl text-foreground mb-6">Bergabung dengan Tim Kami</h1>
						<p className="body-lg text-muted-foreground max-w-3xl mx-auto mb-10">
							Kami mencari individu berbakat yang bersemangat untuk membuat dampak dalam industri
							teknologi. Temukan peluang karir yang sesuai dengan minat dan keahlian Anda.
						</p>
						<Button size="lg" className="btn-primary">
							Lihat Semua Posisi
						</Button>
					</div>
				</section>

				{/* Why Join Us */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Mengapa Bergabung dengan Kami</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Kami menawarkan lingkungan kerja yang mendukung pertumbuhan profesional dan keseimbangan
								hidup.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{benefits.map((benefit, index) => {
								const IconComponent = benefit.icon
								return (
									<Card key={index} className="text-center hover:shadow-lg transition-shadow">
										<CardHeader>
											<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
												<IconComponent className="h-6 w-6 text-primary" />
											</div>
											<CardTitle>{benefit.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground">{benefit.description}</p>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</div>
				</section>

				{/* Open Positions */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Posisi yang Tersedia</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Kami sedang mencari talenta terbaik untuk bergabung dengan tim kami.
							</p>
						</div>

						<div className="grid grid-cols-1 gap-6">
							{positions.map((position) => (
								<Card key={position.id} className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div>
												<CardTitle className="text-xl">{position.title}</CardTitle>
												<div className="flex flex-wrap items-center gap-4 mt-2">
													<div className="flex items-center gap-1 text-sm text-muted-foreground">
														<Building className="h-4 w-4" />
														<span>{position.department}</span>
													</div>
													<div className="flex items-center gap-1 text-sm text-muted-foreground">
														<MapPin className="h-4 w-4" />
														<span>{position.location}</span>
													</div>
													<Badge variant="secondary">{position.type}</Badge>
												</div>
											</div>
											<Button>Apply Now</Button>
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground mb-4">{position.description}</p>

										<div className="mb-4">
											<h4 className="font-medium text-foreground mb-2">Requirements:</h4>
											<ul className="space-y-1">
												{position.requirements.map((req, idx) => (
													<li key={idx} className="flex items-start gap-2">
														<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
														<span className="text-sm text-muted-foreground">{req}</span>
													</li>
												))}
											</ul>
										</div>

										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												<span>{position.experience} experience</span>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Culture */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Budaya Kami</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Lingkungan kerja yang mendorong inovasi, kolaborasi, dan pertumbuhan pribadi.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
									<Users className="h-8 w-8 text-primary" />
								</div>
								<h3 className="heading-md text-foreground mb-3">Kolaborasi</h3>
								<p className="text-muted-foreground">
									Kami percaya bahwa kerja tim yang solid adalah kunci kesuksesan. Lingkungan kerja
									yang mendukung kolaborasi lintas departemen.
								</p>
							</div>

							<div className="text-center">
								<div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
									<TrendingUp className="h-8 w-8 text-primary" />
								</div>
								<h3 className="heading-md text-foreground mb-3">Inovasi</h3>
								<p className="text-muted-foreground">
									Mendorong eksperimen dan pembelajaran berkelanjutan. Kami memberikan ruang untuk
									mencoba ide-ide baru dan kreatif.
								</p>
							</div>

							<div className="text-center">
								<div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
									<Heart className="h-8 w-8 text-primary" />
								</div>
								<h3 className="heading-md text-foreground mb-3">Keseimbangan</h3>
								<p className="text-muted-foreground">
									Menyeimbangkan kehidupan kerja dan pribadi dengan fleksibilitas jam kerja dan
									kebijakan cuti yang mendukung kesejahteraan.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
					<div className="container-width text-center">
						<h2 className="heading-xl text-white mb-4">Siap untuk Bergabung dengan Kami?</h2>
						<p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
							Kirimkan CV dan portofolio Anda, dan mari kita bicarakan bagaimana Anda bisa berkontribusi
							dalam perjalanan kami.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button className="btn-primary-contrast" size="lg">
								Kirim Lamaran
							</Button>
							<Button
								variant="outline"
								className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								onClick={() => (window.location.href = "/contact")}
							>
								<Mail className="h-4 w-4 mr-2" />
								Hubungi HR
							</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}

export default Careers
