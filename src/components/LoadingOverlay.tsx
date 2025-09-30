import { cn } from "@/lib/utils"
import LoadingSpinner from "./LoadingSpinner"

interface LoadingOverlayProps {
	isLoading: boolean
	message?: string
	fullScreen?: boolean
	overlay?: boolean
	className?: string
	spinnerSize?: "sm" | "md" | "lg"
}

const LoadingOverlay = ({ 
	isLoading, 
	message, 
	fullScreen = false, 
	overlay = true,
	className,
	spinnerSize = "md"
}: LoadingOverlayProps) => {
	if (!isLoading) return null

	const containerClasses = cn(
		"flex items-center justify-center",
		fullScreen ? "fixed inset-0 z-50" : "absolute inset-0 z-10",
		overlay ? "bg-background/80 backdrop-blur-sm" : "",
		className
	)

	return (
		<div className={containerClasses}>
			<LoadingSpinner 
				size={spinnerSize} 
				message={message} 
			/>
		</div>
	)
}

export default LoadingOverlay