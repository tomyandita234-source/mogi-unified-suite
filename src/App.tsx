import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Pricing from "./pages/Pricing";

// Import WhatsApp icon
import waIcon from "@/assets/ic-waba.webp";

const queryClient = new QueryClient();

// WhatsApp support number (replace with your actual number)
const WHATSAPP_NUMBER = "6281122888001"; // This is the number from your ContactSection
const WHATSAPP_MESSAGE = "Halo, saya ingin bertanya tentang produk MogiApp";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
          aria-label="Hubungi kami via WhatsApp"
        >
          <img src={waIcon} alt="WhatsApp" className="h-6 w-6" />
        </a>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;