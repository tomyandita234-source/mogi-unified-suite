import { useEffect, useState } from 'react';
import ParallaxSection from './ParallaxSection';
import { Users, Building2, MapPin, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    businesses: 0,
    cities: 0,
    growth: 0
  });

  const finalStats = {
    customers: 10000,
    businesses: 2500,
    cities: 150,
    growth: 300
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      customers: finalStats.customers / steps,
      businesses: finalStats.businesses / steps,
      cities: finalStats.cities / steps,
      growth: finalStats.growth / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounters(prev => ({
          customers: Math.min(Math.floor(prev.customers + increment.customers), finalStats.customers),
          businesses: Math.min(Math.floor(prev.businesses + increment.businesses), finalStats.businesses),
          cities: Math.min(Math.floor(prev.cities + increment.cities), finalStats.cities),
          growth: Math.min(Math.floor(prev.growth + increment.growth), finalStats.growth)
        }));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      value: counters.customers.toLocaleString(),
      suffix: '+',
      label: 'Pelanggan Aktif',
      description: 'Bisnis yang mempercayai platform kami'
    },
    {
      icon: Building2,
      value: counters.businesses.toLocaleString(),
      suffix: '+',
      label: 'Perusahaan',
      description: 'Dari startup hingga enterprise'
    },
    {
      icon: MapPin,
      value: counters.cities.toLocaleString(),
      suffix: '+',
      label: 'Kota',
      description: 'Jangkauan di seluruh Indonesia'
    },
    {
      icon: TrendingUp,
      value: counters.growth.toLocaleString(),
      suffix: '%',
      label: 'Pertumbuhan',
      description: 'Peningkatan efisiensi rata-rata'
    }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Parallax Background Elements */}
      <ParallaxSection speed={0.3} className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Dipercaya Ribuan Bisnis
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Platform MogiApp telah membantu ribuan bisnis meningkatkan efisiensi dan produktivitas di seluruh Indonesia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ParallaxSection 
              key={index} 
              speed={0.2 + (index * 0.1)}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-smooth">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xl font-semibold mb-2 opacity-90">
                  {stat.label}
                </div>
                <div className="text-sm opacity-75">
                  {stat.description}
                </div>
              </div>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;