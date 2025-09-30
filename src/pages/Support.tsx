import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, MessageCircle, BookOpen, Video, Mail, Phone, Clock, Shield, Zap, Users } from "lucide-react"

const Support = () => {
	const supportOptions = [
		{
			icon: HelpCircle,
			title: "Pusat Bantuan",
			description: "Temukan jawaban untuk pertanyaan umum dan panduan penggunaan.",
			action: "Jelajahi",
		},
		{
			icon: MessageCircle,
			title: "Live Chat",
			description: "Hubungi tim dukungan kami secara langsung untuk bantuan instan.",
			action: "Mulai Chat",
		},
		{
			icon: BookOpen,
			title: "Dokumentasi",
			description: "Akses panduan lengkap, tutorial, dan referensi teknis.",
			action: "Baca Dokumen",
		},
		{
			icon: Video,
			title: "Tutorial Video",
			description: "Tonton video panduan langkah demi langkah untuk fitur kami.",
			action: "Tonton Video",
		},
	]

	const faqs = [
		{
			question: "Bagaimana cara memulai akun gratis?",
			answer: "Anda dapat mendaftar akun gratis dengan mengklik tombol 'Mulai Gratis' di halaman utama. Proses ini hanya membutuhkan beberapa menit dan tidak memerlukan kartu kredit.",
		},
		{
			question: "Apakah ada biaya untuk beralih ke paket berbayar?",
			answer: "Ya, ada beberapa paket berbayar yang menawarkan fitur tambahan. Namun, Anda dapat mencoba semua fitur dengan masa percobaan gratis selama 14 hari tanpa perlu kartu kredit.",
		},
		{
			question: "Bagaimana cara menghubungi dukungan teknis?",
			answer: "Anda dapat menghubungi tim dukungan kami melalui live chat, email, atau telepon. Kami tersedia 24/7 untuk membantu Anda.",
		},
		{
			question: "Apakah data saya aman?",
			answer: "Kami menggunakan enkripsi tingkat enterprise dan mengikuti standar keamanan internasional untuk melindungi data Anda. Semua data disimpan di server yang aman dan terlindungi.",
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
					<div className="container-width text-center">
						<h1 className="heading-xxl text-foreground mb-6">Pusat Dukungan</h1>
						<p className="body-lg text-muted-foreground max-w-3xl mx-auto mb-10">
							Kami di sini untuk membantu Anda. Temukan solusi, ajukan pertanyaan, atau hubungi tim
							dukungan kami.
						</p>

						<div className="max-w-2xl mx-auto">
							<div className="flex flex-col sm:flex-row gap-2">
								<Input placeholder="Cari bantuan atau solusi..." className="flex-1" />
								<Button className="btn-primary">Cari</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Support Options */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Cara Mendapatkan Bantuan</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Pilih opsi dukungan yang paling sesuai dengan kebutuhan Anda.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{supportOptions.map((option, index) => {
								const IconComponent = option.icon
								return (
									<Card key={index} className="hover:shadow-lg transition-shadow">
										<CardHeader>
											<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
												<IconComponent className="h-6 w-6 text-primary" />
											</div>
											<CardTitle>{option.title}</CardTitle>
											<CardDescription>{option.description}</CardDescription>
										</CardHeader>
										<CardContent>
											<Button variant="outline" className="w-full">
												{option.action}
											</Button>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</div>
				</section>

				{/* Contact Support */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							<div>
								<h2 className="heading-xl text-foreground mb-6">Hubungi Tim Dukungan</h2>
								<p className="body-lg text-muted-foreground mb-8">
									Tidak menemukan jawaban yang Anda cari? Hubungi tim dukungan kami yang ramah dan
									berpengalaman.
								</p>

								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<Mail className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-medium text-foreground">Email</h3>
											<p className="text-muted-foreground">support@morfotech.id</p>
											<p className="text-sm text-muted-foreground">Respon dalam 24 jam</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<Phone className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-medium text-foreground">Telepon</h3>
											<p className="text-muted-foreground">+62 811-2288-001</p>
											<p className="text-sm text-muted-foreground">Senin-Jumat, 09:00-18:00</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<MessageCircle className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="font-medium text-foreground">Live Chat</h3>
											<p className="text-muted-foreground">Chat langsung dengan agen</p>
											<p className="text-sm text-muted-foreground">24/7 tersedia</p>
										</div>
									</div>
								</div>
							</div>

							<Card>
								<CardHeader>
									<CardTitle>Kirim Pesan</CardTitle>
									<CardDescription>Kirim pertanyaan atau permintaan dukungan Anda.</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-6">
										<div className="space-y-2">
											<Label htmlFor="name">Nama Lengkap</Label>
											<Input id="name" placeholder="Masukkan nama Anda" />
										</div>

										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input id="email" type="email" placeholder="Masukkan email Anda" />
										</div>

										<div className="space-y-2">
											<Label htmlFor="subject">Subjek</Label>
											<Input id="subject" placeholder="Apa yang bisa kami bantu?" />
										</div>

										<div className="space-y-2">
											<Label htmlFor="message">Pesan</Label>
											<Textarea
												id="message"
												placeholder="Jelaskan pertanyaan atau masalah Anda..."
												rows={5}
											/>
										</div>

										<Button className="w-full">Kirim Pesan</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Pertanyaan Umum</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Temukan jawaban untuk pertanyaan yang sering diajukan.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{faqs.map((faq, index) => (
								<Card key={index}>
									<CardHeader>
										<CardTitle className="text-lg">{faq.question}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">{faq.answer}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Service Level Commitment */}
				<section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
					<div className="container-width">
						<div className="text-center mb-16">
							<h2 className="heading-xl text-foreground mb-4">Komitmen Layanan Kami</h2>
							<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
								Kami berkomitmen untuk memberikan layanan dukungan terbaik untuk Anda.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Clock className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Waktu Respons</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Respon awal dalam 2 jam untuk permintaan darurat dan 24 jam untuk permintaan
										umum.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Shield className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>SLA Garansi</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Garansi waktu pemulihan 99.9% dengan kompensasi untuk downtime yang melebihi
										batas.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
										<Users className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Tim Ahli</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Tim dukungan bersertifikat dengan rata-rata pengalaman 5+ tahun di industri
										teknologi.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}

export default Support
