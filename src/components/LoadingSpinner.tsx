import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg"
	className?: string
	message?: string
	fullScreen?: boolean
}

const LoadingSpinner = ({ 
	size = "md", 
	className, 
	message, 
	fullScreen = false 
}: LoadingSpinnerProps) => {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-8 w-8",
		lg: "h-12 w-12"
	}

	const containerClasses = cn(
		"flex flex-col items-center justify-center",
		fullScreen ? "min-h-screen" : "",
		className
	)

	return (
		<div className={containerClasses}>
			<div 
				className={cn(
					"animate-spin rounded-full border-b-2 border-primary",
					sizeClasses[size]
				)} 
			/>
			{message && (
				<p className={cn(
					"mt-2 text-foreground",
					size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
				)}>
					{message}
				</p>
			)}
		</div>
	)
}

export default LoadingSpinner