import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, Target, Award, Building, Globe, TrendingUp, Heart } from "lucide-react"

const About = () => {
	const values = [
		{
			icon: Heart,
			title: "Integritas",
			description: "Kami menjunjung tinggi kejujuran dan transparansi dalam setiap interaksi.",
		},
		{
			icon: Lightbulb,
			title: "Inovasi",
			description: "Terus mengembangkan solusi terdepan untuk tantangan bisnis modern.",
		},
		{
			icon: Users,
			title: "Kolaborasi",
			description: "Bekerja sama erat dengan klien untuk mencapai kesuksesan bersama.",
		},
		{
			icon: Target,
			title: "Kualitas",
			description: "Menyediakan produk dan layanan terbaik untuk memenuhi harapan klien.",
		},
	]

	const team = [
		{
			name: "Budi Santoso",
			role: "CEO & Founder",
			bio: "Berpengalaman lebih dari 15 tahun di industri teknologi dan bisnis.",
			image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
		},
		{
			name: "Siti Rahayu",
			role: "CTO",
			bio: "Ahli dalam pengembangan software dan arsitektur sistem enterprise.",
			image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
		},
		{
			name: "Ahmad Prasetyo",
			role: "Head of Product",
			bio: "Fokus pada pengembangan produk yang memberikan nilai nyata bagi pengguna.",
			image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
		},
		{
			name: "Dewi Kartika",
			role: "Head of Marketing",
			bio: "Berdedikasi dalam membangun brand dan mengembangkan strategi pemasaran.",
			image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
					<div className="container-width text-center">
						<Badge className="mb-4">Tentang Kami</Badge>
						<h1 className="heading-xxl text-foreground mb-6">Mewujudkan Bisnis Digital yang Lebih Baik</h1>
						<p className="body-lg text-muted-foreground max-w-3xl mx-auto mb-10">
							Kami adalah tim yang berdedikasi untuk memberdayakan bisnis melalui teknologi inovatif dan
							solusi yang dirancang khusus untuk kebutuhan Anda.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button size="lg" className="btn-primary">
								Hubungi Kami
							</Button>
							<Button size="lg" variant="outline" onClick={() => (window.location.href = "/careers")}>
								Lihat Karir
							</Button>
						</div>
					</div>
				</section>

				{/* Mission & Vision */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Target className="h-6 w-6 text-primary" />
									</div>
									<CardTitle className="text-2xl">Visi Kami</CardTitle>
									<CardDescription>Arah dan tujuan jangka panjang perusahaan</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-foreground">
										Menjadi platform teknologi terdepan yang memberdayakan bisnis di seluruh
										Indonesia untuk berkembang dalam era digital, dengan solusi yang inovatif,
										terpercaya, dan berkelanjutan.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Lightbulb className="h-6 w-6 text-primary" />
									</div>
									<CardTitle className="text-2xl">Misi Kami</CardTitle>
									<CardDescription>Komitmen dan fokus utama dalam menjalankan bisnis</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<div className="bg-primary/10 p-1 rounded-full mt-1">
												<div className="w-2 h-2 rounded-full bg-primary"></div>
											</div>
											<span className="text-foreground">
												Mengembangkan solusi teknologi yang mudah digunakan dan memberikan nilai
												nyata
											</span>
										</li>
										<li className="flex items-start gap-3">
											<div className="bg-primary/10 p-1 rounded-full mt-1">
												<div className="w-2 h-2 rounded-full bg-primary"></div>
											</div>
											<span className="text-foreground">
												Memberikan layanan pelanggan yang luar biasa dan dukungan teknis yang
												responsif
											</span>
										</li>
										<li className="flex items-start gap-3">
											<div className="bg-primary/10 p-1 rounded-full mt-1">
												<div className="w-2 h-2 rounded-full bg-primary"></div>
											</div>
											<span className="text-foreground">
												Terus berinovasi untuk menghadirkan fitur dan teknologi terbaru
											</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Company Stats */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Dalam Angka</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Prestasi dan pencapaian yang telah kami raih bersama klien kami
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{ icon: Building, value: "500+", label: "Klien Aktif" },
								{ icon: Globe, value: "15+", label: "Negara" },
								{ icon: TrendingUp, value: "98%", label: "Kepuasan Klien" },
								{ icon: Award, value: "25+", label: "Penghargaan" },
							].map((stat, index) => (
								<Card key={index} className="text-center">
									<CardContent className="pt-6">
										<div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
											<stat.icon className="h-8 w-8 text-primary" />
										</div>
										<h3 className="heading-lg text-foreground mb-2">{stat.value}</h3>
										<p className="text-muted-foreground">{stat.label}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Core Values */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Nilai-Nilai Inti</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Prinsip yang menjadi dasar dalam menjalankan bisnis dan melayani klien
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{values.map((value, index) => (
								<Card key={index} className="text-center hover:shadow-lg transition-shadow">
									<CardHeader>
										<div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
											<value.icon className="h-8 w-8 text-primary" />
										</div>
										<CardTitle>{value.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">{value.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Team */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Tim Kami</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Profesional berbakat yang berdedikasi untuk kesuksesan Anda
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							{team.map((member, index) => (
								<Card key={index} className="text-center">
									<CardContent className="pt-6">
										<img
											src={member.image}
											alt={member.name}
											className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
										/>
										<h3 className="heading-md text-foreground mb-1">{member.name}</h3>
										<p className="text-primary mb-3">{member.role}</p>
										<p className="text-sm text-muted-foreground">{member.bio}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
							<h2 className="heading-xl text-white mb-4">Siap untuk Memulai Perjalanan Digital Anda?</h2>
							<p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
								Bergabunglah dengan ribuan bisnis yang telah mempercayai solusi kami untuk
								mengoptimalkan operasional mereka.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button className="btn-primary-contrast" size="lg">
									Jadwalkan Konsultasi
								</Button>
								<Button
									variant="outline"
									className="bg-white/10 border-white/20 text-white hover:bg-white/20"
								>
									Lihat Demo
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

export default About
