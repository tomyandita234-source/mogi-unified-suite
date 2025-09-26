import { ArrowRight, Smartphone, Settings, BarChart3, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: Smartphone,
      title: 'Inovasi',
      description: 'Teknologi terdepan untuk solusi bisnis modern.',
      details: 'Platform terintegrasi untuk semua kebutuhan bisnis'
    },
    {
      icon: Settings,
      title: 'Keamanan',
      description: 'Perlindungan data dan sistem dengan standar keamanan tinggi.',
      details: 'Keamanan data tingkat enterprise dengan enkripsi end-to-end'
    },
    {
      icon: BarChart3,
      title: 'Efisiensi',
      description: 'Optimalisasi proses bisnis untuk produktivitas maksimal.',
      details: 'Aplikasi terintegrasi di berbagai platform untuk kemudahan akses'
    },
    {
      icon: CheckCircle,
      title: 'Dukungan',
      description: 'Tim support 24/7 dengan respons cepat.',
      details: 'Dukungan penuh dengan panduan profesional untuk kesuksesan bisnis'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-4 h-4 bg-primary rounded-full"></div>
        <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-accent rounded-full"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Pekerjaan Anda Jauh Lebih Cepat
          </h2>
          <p className="section-subtitle">
            Dengan menggunakan Platform MogiApp, tersedia dalam bentuk aplikasi Android, iOS, 
            browser ponsel, dan layar komputer untuk aksesibilitas maksimal
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative"
              >
                <div className="text-center group">
                  {/* Step Number & Icon */}
                  <div className="relative mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-full shadow-soft">
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="heading-sm text-foreground mb-6">
                    {step.title}
                  </h3>
                  <p className="body-md text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <p className="body-sm text-primary font-medium">
                    {step.details}
                  </p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 z-10">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="base-card p-8">
            <h3 className="heading-md text-foreground mb-6">
              Siap untuk Memulai?
            </h3>
            <p className="body-lg text-muted-foreground mb-8">
              Bergabunglah dengan ribuan bisnis yang telah merasakan manfaat platform MogiApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary group">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn-outline">
                Jadwalkan Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;