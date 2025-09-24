import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Globe, Monitor, Play } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const platforms = [
    { icon: Smartphone, label: 'Android & iOS' },
    { icon: Globe, label: 'Web Browser' },
    { icon: Monitor, label: 'Desktop' },
  ];

  return (
    <section id="hero" className="pt-20 pb-16 min-h-screen flex items-center bg-gradient-to-br from-background to-primary/5 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Platform Terpadu #1 di Indonesia
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Platform Terpadu{' '}
              <span className="text-primary block">Solusi Bisnis</span>{' '}
              Terdepan
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0">
              MogiApp menghadirkan platform terintegrasi untuk Point of Sale, 
              manajemen operasional, tracking armada, dan digital signature. 
              <strong className="text-foreground"> Satu platform untuk semua kebutuhan bisnis Anda.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-3">
                Mulai Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Lihat Demo
              </Button>
            </div>

            {/* Platform Availability */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Tersedia di semua platform
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm font-medium text-foreground px-3 py-2 rounded-full border border-border">
                    <platform.icon className="h-4 w-4 text-primary" />
                    {platform.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <img
                src={heroImage}
                alt="MogiApp Platform Overview"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Info Cards */}
              <div className="absolute top-6 left-6 bg-background/80 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-foreground">99.9% Uptime</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-background/80 p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Dukungan 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;