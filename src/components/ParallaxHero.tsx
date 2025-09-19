import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Globe, Monitor, Play } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import heroImage from '@/assets/hero-image.jpg';

const ParallaxHero = () => {
  const platforms = [
    { icon: Smartphone, label: 'Android & iOS' },
    { icon: Globe, label: 'Web Browser' },
    { icon: Monitor, label: 'Desktop' },
  ];

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      {/* Modern Background Elements - WebAndCrafts style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-12 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-36 right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/70 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent/80 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/90 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '0.8s' }}></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid-2 items-center gap-16">
          {/* Content */}
          <ParallaxSection speed={0.2} className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Platform Terpadu #1 di Indonesia
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
                Platform Terpadu{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent block">Solusi Bisnis</span>{' '}
                Terdepan
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-xl font-medium leading-relaxed">
                MogiApp menghadirkan platform terintegrasi untuk Point of Sale, 
                manajemen operasional, tracking armada, dan digital signature. 
                <strong className="text-foreground"> Satu platform untuk semua kebutuhan bisnis Anda.</strong>
              </p>

              {/* CTA Buttons - WebAndCrafts style */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full text-lg px-10 py-6 h-auto shadow-lg transition-all duration-300 group hover:translate-y-[-2px]">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-lg px-10 py-6 h-auto backdrop-blur-sm transition-all duration-300 group hover:translate-y-[-2px]">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Demo
                </Button>
              </div>

              {/* Platform Availability */}
              <div className="space-y-6">
                <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                  Tersedia di semua platform
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {platforms.map((platform, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm font-medium text-foreground px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <platform.icon className="h-5 w-5 text-primary" />
                      {platform.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxSection>

          {/* Hero Image - WebAndCrafts style */}
          <div className="relative">
            <div className="animate-fade-in">
              <div className="relative group overflow-hidden rounded-[24px] shadow-2xl border border-white/10">
                <img
                  src={heroImage}
                  alt="MogiApp Platform Overview"
                  className="w-full h-auto object-cover transition-all duration-700 transform-gpu group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Overlay Info Cards - WebAndCrafts style */}
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">99.9% Uptime</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-center">
                    <div className="heading-sm text-primary">10K+</div>
                    <div className="body-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements - Repositioned for better visual balance */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Improved visibility */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-7 h-12 border-2 border-primary/80 rounded-full flex justify-center shadow-md backdrop-blur-sm bg-background/30">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;