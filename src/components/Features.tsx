import { Rocket, Shield, Zap, Headphones } from 'lucide-react';
import ParallaxSection from './ParallaxSection';

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Inovasi',
      description: 'Teknologi terdepan untuk solusi bisnis masa depan',
      details: 'Platform terintegrasi untuk semua kebutuhan bisnis dengan teknologi GPS terkini untuk tracking yang akurat.'
    },
    {
      icon: Shield,
      title: 'Keamanan',
      description: 'Perlindungan data dan aset dengan standar keamanan tinggi',
      details: 'Keamanan data tingkat enterprise dengan enkripsi end-to-end dan fitur remote engine cut-off untuk keamanan maksimal.'
    },
    {
      icon: Zap,
      title: 'Efisiensi',
      description: 'Optimalisasi proses bisnis untuk produktivitas maksimal',
      details: 'Aplikasi tersedia di Android, iOS, browser, dan desktop dengan sinkronisasi data real-time di semua perangkat.'
    },
    {
      icon: Headphones,
      title: 'Dukungan',
      description: 'Tim support 24/7 dengan respons cepat',
      details: 'Dukungan pelanggan profesional untuk membantu implementasi dan troubleshooting kebutuhan bisnis Anda.'
    }
  ];

  return (
    <section id="solusi" className="py-24 relative overflow-hidden">
      {/* Parallax Background */}
      <ParallaxSection speed={0.6} className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mengapa Memilih MogiApp?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform terintegrasi dengan teknologi terdepan untuk mendukung efisiensi bisnis dan keamanan kendaraan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ParallaxSection
              key={index}
              speed={0.3 + (index * 0.1)} 
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="feature-icon mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                {feature.description}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.details}
              </p>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;