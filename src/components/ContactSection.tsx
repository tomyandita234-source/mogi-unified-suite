import { useState } from "react"
import { ContactAPI } from "../lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react"

const ContactSection = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<{
		success: boolean
		message: string
	} | null>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus(null)

		// Client-side validation
		if (!formData.name.trim()) {
			setSubmitStatus({
				success: false,
				message: "Nama harus diisi",
			})
			setIsSubmitting(false)
			return
		}

		if (!formData.email.trim()) {
			setSubmitStatus({
				success: false,
				message: "Email harus diisi",
			})
			setIsSubmitting(false)
			return
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			setSubmitStatus({
				success: false,
				message: "Format email tidak valid",
			})
			setIsSubmitting(false)
			return
		}

		if (!formData.message.trim()) {
			setSubmitStatus({
				success: false,
				message: "Pesan harus diisi",
			})
			setIsSubmitting(false)
			return
		}

		try {
			await ContactAPI.send(formData)
			setSubmitStatus({
				success: true,
				message: "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
			})
			setFormData({ name: "", email: "", phone: "", message: "" })
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.message && error.message.includes("rate limit")) {
				setSubmitStatus({
					success: false,
					message: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 jam.",
				})
			} else {
				setSubmitStatus({
					success: false,
					message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
				})
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	// WhatsApp contact function
	const handleWhatsAppClick = () => {
		const phoneNumber = "6281122888001" // Indonesian format without +
		const message = "Halo, saya ingin berkonsultasi tentang produk MogiApp."
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
		window.open(whatsappUrl, "_blank")
	}

	return (
		<section id="kontak" className="py-20 px-4 sm:px-6 lg:px-8 section-alt relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-16 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-16 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
			</div>

			<div className="container-width relative z-10">
				{/* Section Header */}
				<div className="section-header">
					<h2 className="section-title">Hubungi Kami</h2>
					<p className="section-subtitle">
						Punya pertanyaan atau ingin konsultasi? Jangan ragu untuk menghubungi kami.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
					{/* Contact Form */}
					<div className="base-card p-8">
						<h3 className="text-2xl font-semibold mb-6">Kirim Pesan</h3>

						{submitStatus && (
							<div
								className={`p-4 mb-6 rounded-lg ${
									submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
								}`}
							>
								{submitStatus.message}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="space-y-4">
								<div>
									<label htmlFor="name" className="block text-sm font-medium mb-1">
										Nama Lengkap
									</label>
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										placeholder="Masukkan nama lengkap Anda"
									/>
								</div>

								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-1">
										Email
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
										required
										placeholder="Masukkan alamat email Anda"
									/>
								</div>

								<div>
									<label htmlFor="phone" className="block text-sm font-medium mb-1">
										Nomor Telepon
									</label>
									<Input
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										placeholder="Masukkan nomor telepon Anda"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block text-sm font-medium mb-1">
										Pesan
									</label>
									<Textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										placeholder="Tulis pesan Anda di sini"
										rows={5}
									/>
								</div>

								<Button type="submit" disabled={isSubmitting} className="w-full">
									{isSubmitting ? "Mengirim..." : "Kirim Pesan"}
									<Send className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</form>

						{/* WhatsApp Contact Button */}
						<div className="mt-6">
							<Button onClick={handleWhatsAppClick} className="w-full bg-green-500 hover:bg-green-600">
								<MessageCircle className="mr-2 h-4 w-4" />
								Kontak Sales via WhatsApp
							</Button>
						</div>
					</div>

					{/* Contact Information */}
					<div>
						<h3 className="text-2xl font-semibold mb-6">Informasi Kontak</h3>

						<div className="space-y-8">
							<div className="flex items-start">
								<div className="bg-primary/10 p-3 rounded-lg mr-4">
									<Phone className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h4 className="font-medium">Telepon</h4>
									<p className="text-muted-foreground mt-1">0811-2288-8001</p>
									<a
										href="https://wa.me/6281122888001"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:text-primary/80 transition-smooth"
									>
										WhatsApp: 0811-2288-8001
									</a>
								</div>
							</div>

							<div className="flex items-start">
								<div className="bg-primary/10 p-3 rounded-lg mr-4">
									<Mail className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h4 className="font-medium">Email</h4>
									<p className="text-muted-foreground mt-1">info@morfotech.id</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="bg-primary/10 p-3 rounded-lg mr-4">
									<MapPin className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h4 className="font-medium">Alamat</h4>
									<p className="text-muted-foreground mt-1">
										<strong>PT. Morfogenesis Teknologi Indonesia | Morfotech</strong>
										<br />
										Tendean Square
										<br />
										Jl. Wolter Monginsidi No 122-124, Kavling No.20 21
										<br />
										RT.16/RW.2, Petogogan, Kec. Kby. Baru
										<br />
										Daerah Khusus Ibukota Jakarta 12170
									</p>
								</div>
							</div>
						</div>

						{/* Google Maps Embed */}
						<div className="mt-8 h-64 rounded-xl overflow-hidden border border-border">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2391717!2d106.8146405!3d-6.2391717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f124d79b2257%3A0x316bf64cfe761e16!2sPT.%20Morfogenesis%20Teknologi%20Indonesia%20%7C%20Morfotech!5e0!3m2!1sen!2sid!4v1640000000000!5m2!1sen!2sid"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								title="Lokasi Kantor PT. Morfogenesis Teknologi Indonesia | Morfotech"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactSection
