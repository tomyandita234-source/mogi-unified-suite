import { useState } from "react"
import { ContactAPI } from "@/lib/api"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { handleApiError, showSuccessMessage } from "@/utils/errorHandler"
import { validateContactForm } from "@/utils/validation"
import LoadingOverlay from "@/components/LoadingOverlay"

const Contact = () => {
	const { toast } = useToast()
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[name]
				return newErrors
			})
		}
	}

	const validateForm = () => {
		const validation = validateContactForm(formData)
		
		if (!validation.isValid) {
			// Convert validation errors to error object
			const newErrors: Record<string, string> = {}
			validation.errors.forEach(error => {
				newErrors[error.field] = error.message
			})
			setErrors(newErrors)
			return false
		}
		
		setErrors({})
		return true
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			toast({
				variant: "destructive",
				title: "Validation Error",
				description: "Please fix the errors in the form before submitting.",
			})
			return
		}

		setLoading(true)

		try {
			const response = await ContactAPI.send(formData)

			showSuccessMessage("Success", response.message || "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.")

			// Reset form
			setFormData({
				name: "",
				email: "",
				phone: "",
				message: "",
			})
		} catch (error: any) {
			handleApiError(error, "Gagal mengirim pesan. Silakan coba lagi nanti.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-background relative">
			<LoadingOverlay 
				isLoading={loading} 
				message="Sending message..." 
				overlay={true}
			/>
			<Header />
			<main className="pt-16 pb-16">
				<div className="container-width section-padding">
					<div className="text-center mb-16">
						<h1 className="heading-xl text-foreground mb-6">Hubungi Kami</h1>
						<p className="body-lg text-muted-foreground max-w-2xl mx-auto">
							Punya pertanyaan atau ingin bekerja sama? Kami siap membantu Anda.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<Card>
							<CardHeader>
								<CardTitle>Kirim Pesan</CardTitle>
								<CardDescription>
									Isi formulir di bawah ini dan kami akan segera menghubungi Anda.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="name">Nama Lengkap *</Label>
										<Input
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Masukkan nama lengkap Anda"
											className={errors.name ? "border-red-500" : ""}
										/>
										{errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="email">Email *</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="Masukkan email Anda"
												className={errors.email ? "border-red-500" : ""}
											/>
											{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
										</div>

										<div className="space-y-2">
											<Label htmlFor="phone">Telepon</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												value={formData.phone}
												onChange={handleChange}
												placeholder="Masukkan nomor telepon"
												className={errors.phone ? "border-red-500" : ""}
											/>
											{errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">Pesan *</Label>
										<Textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Tulis pesan Anda di sini..."
											rows={6}
											className={errors.message ? "border-red-500" : ""}
										/>
										{errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
									</div>

									<Button type="submit" className="w-full" disabled={loading}>
										{loading ? "Mengirim..." : "Kirim Pesan"}
									</Button>
								</form>
							</CardContent>
						</Card>

						<div className="space-y-8">
							<Card>
								<CardHeader>
									<CardTitle>Informasi Kontak</CardTitle>
									<CardDescription>Cara lain untuk menghubungi kami.</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-medium text-foreground">Telepon</h3>
											<p className="text-muted-foreground">+62 811-2288-001</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-medium text-foreground">Email</h3>
											<p className="text-muted-foreground">info@morfotech.id</p>
										</div>
									</div>

									<div className="flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-primary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										</div>
										<div>
											<h3 className="font-medium text-foreground">Alamat</h3>
											<p className="text-muted-foreground">
												Jl. Merdeka No. 123
												<br />
												Jakarta, Indonesia 12345
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Jam Operasional</CardTitle>
									<CardDescription>Waktu kami melayani Anda.</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-foreground">Senin - Jumat</span>
											<span className="text-muted-foreground">09:00 - 18:00</span>
										</div>
										<div className="flex justify-between">
											<span className="text-foreground">Sabtu</span>
											<span className="text-muted-foreground">10:00 - 16:00</span>
										</div>
										<div className="flex justify-between">
											<span className="text-foreground">Minggu</span>
											<span className="text-muted-foreground">Tutup</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default Contact