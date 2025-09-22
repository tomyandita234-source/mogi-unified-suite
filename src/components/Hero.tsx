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
    <section id="hero" className="pt-16 min-h-screen flex items-center hero-gradient relative">
      <div className="container-width section-padding relative z-10">
        <div className="grid-2 items-center gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Platform Terpadu #1 di Indonesia
            </div>

            <h1 className="heading-xl text-foreground mb-8 leading-tight">
              Platform Terpadu{' '}
              <span className="text-primary block">Solusi Bisnis</span>{' '}
              Terdepan
            </h1>
            
            <p className="body-lg text-muted-foreground mb-12 max-w-xl">
              MogiApp menghadirkan platform terintegrasi untuk Point of Sale, 
              manajemen operasional, tracking armada, dan digital signature. 
              <strong className="text-foreground"> Satu platform untuk semua kebutuhan bisnis Anda.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button className="btn-primary text-lg px-10 py-4">
                Mulai Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-outline text-lg px-10 py-4">
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
                  <div key={index} className="flex items-center gap-3 text-sm font-medium text-foreground px-4 py-3 rounded-full border border-border">
                    <platform.icon className="h-5 w-5 text-primary" />
                    {platform.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={heroImage}
                alt="MogiApp Platform Overview"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Info Cards */}
              <div className="absolute top-6 left-6 bg-background/80 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="body-sm font-semibold text-foreground">99.9% Uptime</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-background/80 p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <p className="body-sm font-semibold text-foreground">Dukungan 24/7</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;