import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import StatsSection from '@/components/StatsSection';
import Features from '@/components/Features';
import ProcessSection from '@/components/ProcessSection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <ProductShowcase />
        <Features />
        <ProcessSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
