import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type BreakpointWidths = Record<Breakpoint, number>

const BREAKPOINTS: BreakpointWidths = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
}

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint>("md")
	const [windowWidth, setWindowWidth] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			
			const width = window.innerWidth
			let currentBreakpoint: Breakpoint = "xs"
			
			if (width >= BREAKPOINTS["2xl"]) {
				currentBreakpoint = "2xl"
			} else if (width >= BREAKPOINTS.xl) {
				currentBreakpoint = "xl"
			} else if (width >= BREAKPOINTS.lg) {
				currentBreakpoint = "lg"
			} else if (width >= BREAKPOINTS.md) {
				currentBreakpoint = "md"
			} else if (width >= BREAKPOINTS.sm) {
				currentBreakpoint = "sm"
			} else {
				currentBreakpoint = "xs"
			}
			
			setBreakpoint(currentBreakpoint)
		}

		// Set initial values
		handleResize()
		
		// Add event listener
		window.addEventListener("resize", handleResize)
		
		// Cleanup
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const isMobile = breakpoint === "xs" || breakpoint === "sm"
	const isTablet = breakpoint === "md"
	const isDesktop = breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl"
	
	const isGreaterThan = (breakpoint: Breakpoint) => {
		return windowWidth >= BREAKPOINTS[breakpoint]
	}
	
	const isLessThan = (breakpoint: Breakpoint) => {
		return windowWidth < BREAKPOINTS[breakpoint]
	}

	return {
		breakpoint,
		windowWidth,
		isMobile,
		isTablet,
		isDesktop,
		isGreaterThan,
		isLessThan,
	}
}

export default useBreakpoint