import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, ShoppingCart, Users, Mail, User, LogOut, Menu, X, Youtube } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

interface SidebarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
	onLogout: () => void
}

const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
	const [isMobileOpen, setIsMobileOpen] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	const menuItems = [
		{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ id: "blog", label: "Blog Management", icon: FileText },
		{ id: "product", label: "Product Management", icon: ShoppingCart },
		{ id: "user", label: "User Management", icon: Users },
		{ id: "contact", label: "Contact Messages", icon: Mail },
		{ id: "youtube", label: "YouTube Videos", icon: Youtube },
		{ id: "profile", label: "Profile", icon: User },
	]

	const handleNavigation = (tab: string) => {
		setActiveTab(tab)
		setIsMobileOpen(false)
	}

	return (
		<>
			{/* Mobile menu button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Button variant="outline" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
					{isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
				</Button>
			</div>

			{/* Mobile sidebar overlay */}
			{isMobileOpen && (
				<div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />
			)}

			{/* Sidebar */}
			<div
				className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
					isMobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="p-6 border-b border-border">
						<h2 className="text-xl font-bold">Admin Panel</h2>
						<p className="text-sm text-muted-foreground">MogiApp Dashboard</p>
					</div>

					{/* Navigation */}
					<nav className="flex-1 overflow-y-auto py-4">
						<ul className="space-y-1 px-3">
							{menuItems.map((item) => {
								const Icon = item.icon
								const isActive = activeTab === item.id

								return (
									<li key={item.id}>
										<Button
											variant={isActive ? "secondary" : "ghost"}
											className="w-full justify-start gap-3 h-12"
											onClick={() => handleNavigation(item.id)}
										>
											<Icon className="h-5 w-5" />
											<span>{item.label}</span>
										</Button>
									</li>
								)
							})}
						</ul>
					</nav>

					{/* Logout button */}
					<div className="p-4 border-t border-border">
						<Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={onLogout}>
							<LogOut className="h-5 w-5" />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</div>

			{/* Overlay for mobile */}
			{isMobileOpen && (
				<div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileOpen(false)} />
			)}
		</>
	)
}

export default Sidebar
