import { TrendingUp, Users, Building, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '9,960+',
      label: 'Pelanggan Aktif',
      description: 'Dari berbagai sektor bisnis'
    },
    {
      icon: Users,
      number: '2,460+',
      label: 'Perusahaan',
      description: 'Telah mempercayai kami'
    },
    {
      icon: Building,
      number: '120+',
      label: 'Kota',
      description: 'Di seluruh Indonesia'
    },
    {
      icon: Award,
      number: '300%',
      label: 'Pertumbuhan',
      description: 'Peningkatan efisiensi'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title text-white">
            Dipercaya Ribuan Bisnis
          </h2>
          <p className="section-subtitle text-white/80">
            Bergabunglah dengan ribuan perusahaan yang telah merasakan manfaat platform MogiApp
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                
                <div className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                
                <p className="text-white/70 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;