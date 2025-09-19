import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Globe, Monitor } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const platforms = [
    { icon: Smartphone, label: 'Android & iOS' },
    { icon: Globe, label: 'Web Browser' },
    { icon: Monitor, label: 'Desktop' },
  ];

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Platform Terpadu{' '}
              <span className="text-gradient">Solusi Bisnis</span>{' '}
              Terdepan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              MogiApp menghadirkan platform terintegrasi untuk Point of Sale, 
              manajemen operasional, tracking armada, dan digital signature. 
              <strong className="text-foreground"> Satu platform untuk semua kebutuhan bisnis Anda.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="hero-button group">
                Mulai Gratis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="px-8 py-4 rounded-full font-semibold border-2 transition-smooth hover:bg-accent hover:text-accent-foreground hover:border-accent">
                Lihat Demo
              </Button>
            </div>

            {/* Platform Availability */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Tersedia di semua platform
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <platform.icon className="h-5 w-5 text-primary" />
                    {platform.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src={heroImage}
                alt="MogiApp Platform Overview"
                className="w-full h-auto rounded-3xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;