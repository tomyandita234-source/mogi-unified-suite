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
    <section id="hero" className="pt-16 min-h-screen flex items-center hero-gradient relative overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxSection speed={0.1} className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </ParallaxSection>

      {/* Floating Elements */}
      <ParallaxSection speed={0.4} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </ParallaxSection>

      <div className="container-width section-padding relative z-10">
        <div className="grid-2 items-center gap-16">
          {/* Content */}
          <ParallaxSection speed={0.2} className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20 transition-smooth hover:bg-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Platform Terpadu #1 di Indonesia
              </div>

              <h1 className="heading-xl text-foreground mb-8 leading-tight">
                Platform Terpadu{' '}
                <span className="text-gradient block">Solusi Bisnis</span>{' '}
                Terdepan
              </h1>
              
              <p className="body-lg text-muted-foreground mb-12 max-w-xl">
                MogiApp menghadirkan platform terintegrasi untuk Point of Sale, 
                manajemen operasional, tracking armada, dan digital signature. 
                <strong className="text-foreground"> Satu platform untuk semua kebutuhan bisnis Anda.</strong>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Button className="btn-primary group text-lg px-10 py-4">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button className="btn-outline text-lg px-10 py-4 group">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Demo
                </Button>
              </div>

              {/* Platform Availability */}
              <div className="space-y-6">
                <p className="body-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Tersedia di semua platform
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {platforms.map((platform, index) => (
                    <div key={index} className="interactive-card flex items-center gap-3 text-sm font-medium text-foreground px-4 py-3 rounded-full">
                      <platform.icon className="h-5 w-5 text-primary" />
                      {platform.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxSection>

          {/* Hero Image with Parallax */}
          <ParallaxSection speed={0.3} className="relative">
            <div className="animate-scale-in">
              <div className="relative group">
                <img
                  src={heroImage}
                  alt="MogiApp Platform Overview"
                  className="w-full h-auto rounded-3xl shadow-large transition-smooth group-hover:shadow-xl hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl transition-smooth group-hover:opacity-15"></div>
                
                {/* Overlay Info Cards */}
                <div className="absolute top-6 left-6 base-card backdrop-blur-sm p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="body-sm font-semibold text-foreground">99.9% Uptime</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 base-card backdrop-blur-sm p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-center">
                    <div className="heading-sm text-primary">10K+</div>
                    <div className="body-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </ParallaxSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ParallaxSection speed={0.1} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
};

export default ParallaxHero;