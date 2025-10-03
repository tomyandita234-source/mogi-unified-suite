import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
	LayoutDashboard,
	FileText,
	ShoppingCart,
	Users,
	Mail,
	User,
	LogOut,
	Menu,
	X,
	Youtube,
	ChevronLeft,
	ChevronRight,
	Settings,
	BarChart3,
	FilePlus,
	Tag,
	MessageSquare,
	Shield,
	Briefcase,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

interface SidebarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
	onLogout: () => void
}

const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
	const [isMobileOpen, setIsMobileOpen] = useState(false)
	const [isMinimized, setIsMinimized] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	// Check screen size on mount and resize
	useEffect(() => {
		const handleResize = () => {
			// Auto-minimize on smaller screens
			if (window.innerWidth < 1024) {
				setIsMinimized(false) // On mobile, we use the overlay instead
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const menuItems = [
		{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ id: "blogs", label: "Blog Management", icon: FileText },
		{ id: "products", label: "Product Management", icon: ShoppingCart },
		{ id: "users", label: "User Management", icon: Users },
		{ id: "contacts", label: "Contact Messages", icon: Mail },
		{ id: "youtube", label: "YouTube Videos", icon: Youtube },
		{ id: "categories", label: "Blog Categories", icon: Tag },
		{ id: "comments", label: "Blog Comments", icon: MessageSquare },
		{ id: "careers", label: "Career Opportunities", icon: Briefcase },
		{ id: "api", label: "API Management", icon: Shield },
		{ id: "settings", label: "Settings", icon: Settings },
		{ id: "profile", label: "Profile", icon: User },
	]

	const handleNavigation = (tab: string) => {
		setActiveTab(tab)
		setIsMobileOpen(false)
	}

	const toggleMinimize = () => {
		setIsMinimized(!isMinimized)
	}

	return (
		<>
			{/* Mobile menu button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Button variant="outline" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
					{isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
				</Button>
			</div>

			{/* Minimize toggle button - visible on desktop */}
			<div className="hidden lg:block fixed top-4 left-64 z-40 transition-all duration-300 ease-in-out">
				<Button variant="outline" size="icon" onClick={toggleMinimize} className="rounded-full shadow-lg">
					{isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
				</Button>
			</div>

			{/* Mobile sidebar overlay */}
			{isMobileOpen && (
				<div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />
			)}

			{/* Sidebar */}
			<div
				className={`fixed lg:static inset-y-0 left-0 z-40 bg-background border-r border-border transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
					isMobileOpen ? "translate-x-0" : "-translate-x-full"
				} ${isMinimized ? "lg:w-20" : "lg:w-64"}`}
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className={`p-6 border-b border-border ${isMinimized ? "p-4" : ""}`}>
						{!isMinimized ? (
							<>
								<h2 className="text-xl font-bold">Admin Panel</h2>
								<p className="text-sm text-muted-foreground">MogiApp Dashboard</p>
							</>
						) : (
							<h2 className="text-lg font-bold text-center">MP</h2>
						)}
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
											className={`w-full justify-start gap-3 h-12 ${
												isMinimized ? "px-2 justify-center" : ""
											}`}
											onClick={() => handleNavigation(item.id)}
										>
											<Icon className="h-5 w-5" />
											{!isMinimized && <span>{item.label}</span>}
										</Button>
									</li>
								)
							})}
						</ul>
					</nav>

					{/* Logout button */}
					<div className="p-4 border-t border-border">
						<Button
							variant="outline"
							className={`w-full justify-start gap-3 h-12 ${isMinimized ? "px-2 justify-center" : ""}`}
							onClick={onLogout}
						>
							<LogOut className="h-5 w-5" />
							{!isMinimized && <span>Logout</span>}
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
