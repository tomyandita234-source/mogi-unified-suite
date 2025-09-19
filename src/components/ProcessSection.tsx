import ParallaxSection from './ParallaxSection';
import { ArrowRight, UserPlus, Settings, Zap, BarChart } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Daftar & Setup',
      description: 'Buat akun dan setup platform sesuai kebutuhan bisnis Anda dalam hitungan menit',
      details: 'Proses onboarding yang mudah dengan panduan step-by-step'
    },
    {
      icon: Settings,
      title: 'Konfigurasi',
      description: 'Atur produk, tim, dan workflow bisnis dengan template yang sudah tersedia',
      details: 'Customisasi sesuai industri dan skala bisnis Anda'
    },
    {
      icon: Zap,
      title: 'Implementasi',
      description: 'Mulai menggunakan semua fitur platform dengan dukungan tim ahli kami',
      details: 'Training gratis dan support 24/7 untuk memastikan sukses implementasi'
    },
    {
      icon: BarChart,
      title: 'Optimisasi',
      description: 'Monitor performa dan optimalkan operasional dengan insights data real-time',
      details: 'Dashboard analytics komprehensif untuk pengambilan keputusan yang tepat'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxSection speed={0.4} className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-4 h-4 bg-primary rounded-full"></div>
        <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-accent rounded-full"></div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pekerjaan Anda Jauh Lebih Cepat
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dengan menggunakan Platform MogiApp, tersedia dalam bentuk aplikasi Android, iOS, 
            browser ponsel, dan layar komputer untuk aksesibilitas maksimal
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ParallaxSection 
                key={index} 
                speed={0.3 + (index * 0.1)}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="text-center group">
                  {/* Step Number & Icon */}
                  <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full shadow-soft group-hover:shadow-medium transition-smooth group-hover:scale-110">
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {step.details}
                  </p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 z-10">
                      <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                  )}
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <ParallaxSection speed={0.2} className="text-center mt-16">
          <div className="bg-card rounded-3xl p-12 shadow-soft border border-border">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Siap Untuk Memulai?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan bisnis yang telah merasakan efisiensi Platform MogiApp. 
              Mulai gratis hari ini tanpa komitmen jangka panjang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="hero-button group">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-4 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
                Jadwalkan Demo
              </button>
            </div>
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
};

export default ProcessSection;