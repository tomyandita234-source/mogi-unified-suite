import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
	children: ReactNode
	className?: string
	columns?: {
		xs?: number
		sm?: number
		md?: number
		lg?: number
		xl?: number
	}
	gap?: "xs" | "sm" | "md" | "lg" | "xl"
	alignItems?: "start" | "center" | "end" | "stretch"
	justifyContent?: "start" | "center" | "end" | "between" | "around"
}

const ResponsiveGrid = ({
	children,
	className,
	columns = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 },
	gap = "md",
	alignItems = "stretch",
	justifyContent = "start",
}: ResponsiveGridProps) => {
	const gapClasses = {
		xs: "gap-2",
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12",
	}

	const alignItemsClasses = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
	}

	const justifyContentClasses = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
	}

	// Predefined grid column classes for Tailwind to recognize
	const gridColumnClasses = {
		"grid-cols-1": columns.xs === 1,
		"grid-cols-2": columns.xs === 2,
		"grid-cols-3": columns.xs === 3,
		"grid-cols-4": columns.xs === 4,
		"grid-cols-5": columns.xs === 5,
		"grid-cols-6": columns.xs === 6,
		"sm:grid-cols-1": columns.sm === 1,
		"sm:grid-cols-2": columns.sm === 2,
		"sm:grid-cols-3": columns.sm === 3,
		"sm:grid-cols-4": columns.sm === 4,
		"sm:grid-cols-5": columns.sm === 5,
		"sm:grid-cols-6": columns.sm === 6,
		"md:grid-cols-1": columns.md === 1,
		"md:grid-cols-2": columns.md === 2,
		"md:grid-cols-3": columns.md === 3,
		"md:grid-cols-4": columns.md === 4,
		"md:grid-cols-5": columns.md === 5,
		"md:grid-cols-6": columns.md === 6,
		"lg:grid-cols-1": columns.lg === 1,
		"lg:grid-cols-2": columns.lg === 2,
		"lg:grid-cols-3": columns.lg === 3,
		"lg:grid-cols-4": columns.lg === 4,
		"lg:grid-cols-5": columns.lg === 5,
		"lg:grid-cols-6": columns.lg === 6,
		"xl:grid-cols-1": columns.xl === 1,
		"xl:grid-cols-2": columns.xl === 2,
		"xl:grid-cols-3": columns.xl === 3,
		"xl:grid-cols-4": columns.xl === 4,
		"xl:grid-cols-5": columns.xl === 5,
		"xl:grid-cols-6": columns.xl === 6,
	}

	return (
		<div
			className={cn(
				"grid",
				gridColumnClasses,
				gapClasses[gap],
				alignItemsClasses[alignItems],
				justifyContentClasses[justifyContent],
				className
			)}
		>
			{children}
		</div>
	)
}

export default ResponsiveGrid