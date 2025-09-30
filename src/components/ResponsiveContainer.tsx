import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
	children: ReactNode
	className?: string
	padding?: "none" | "sm" | "md" | "lg"
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
	center?: boolean
}

const ResponsiveContainer = ({
	children,
	className,
	padding = "md",
	maxWidth = "7xl",
	center = true,
}: ResponsiveContainerProps) => {
	const paddingClasses = {
		none: "",
		sm: "px-4 sm:px-6",
		md: "px-4 sm:px-6 lg:px-8",
		lg: "px-4 sm:px-6 lg:px-12 xl:px-20",
	}

	const maxWidthClasses = {
		sm: "max-w-screen-sm",
		md: "max-w-screen-md",
		lg: "max-w-screen-lg",
		xl: "max-w-screen-xl",
		"2xl": "max-w-screen-2xl",
		"3xl": "max-w-screen-3xl",
		"4xl": "max-w-screen-4xl",
		"5xl": "max-w-screen-5xl",
		"6xl": "max-w-screen-6xl",
		"7xl": "max-w-screen-7xl",
		full: "max-w-full",
	}

	return (
		<div
			className={cn(
				"w-full mx-auto",
				center ? "container" : "",
				paddingClasses[padding],
				maxWidth !== "full" ? maxWidthClasses[maxWidth] : "",
				className
			)}
		>
			{children}
		</div>
	)
}

export default ResponsiveContainer