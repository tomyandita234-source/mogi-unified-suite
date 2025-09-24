import { Rocket, Shield, Zap, Headphones } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Features = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el) => observer.observe(el));
    
    return () => {
      featureElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
    <section id="solusi" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={sectionRef}>
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="section-header opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="section-title">
            Mengapa Memilih <span className="text-primary">MogiApp</span>?
          </h2>
          <p className="section-subtitle">
            Platform terintegrasi dengan teknologi terdepan untuk mendukung efisiensi bisnis dan keamanan kendaraan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card text-center group opacity-0 translate-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:bg-white/20 transition-all duration-500 hover:translate-y-[-8px]"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mx-auto mb-8 bg-primary/10 p-5 rounded-full inline-flex items-center justify-center shadow-inner group-hover:bg-primary/20 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-lg text-foreground/90 mb-6 font-medium">
                {feature.description}
              </p>
              <p className="text-base text-foreground/70">
                {feature.details}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-6">
            <button className="btn-primary text-lg px-10 py-4">
              Mulai Gratis Sekarang
            </button>
            <button className="btn-outline text-lg px-10 py-4">
              Jadwalkan Demo
            </button>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium text-base hover:text-primary/80 transition-colors duration-300 group">
            Pelajari lebih lanjut
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;