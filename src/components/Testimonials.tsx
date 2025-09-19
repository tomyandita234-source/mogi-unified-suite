import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Andi Pratama',
      role: 'Pemilik Ekspedisi',
      company: 'PT. Logistik Nusantara',
      content: 'Sejak menggunakan Mogi Fleet, pengelolaan armada kami jauh lebih mudah dan aman! Real-time tracking sangat membantu operasional.',
      rating: 5
    },
    {
      name: 'Rina Sari',
      role: 'HR Manager',
      company: 'CV. Teknologi Maju',
      content: 'MogiSign mempercepat proses tanda tangan kontrak hingga 70%. Sangat efisien dan menghemat waktu administrasi.',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'Owner',
      company: 'Warung Kopi Modern',
      content: 'Mogi POS membantu kami mengelola 15 outlet dengan mudah. Laporan real-time dan integrasi payment gateway sangat membantu!',
      rating: 5
    }
  ];

  return (
    <section id="testimoni" className="section-padding section-alt">
      <div className="container-width">
        {/* Section Header */}
        <div className="section-header animate-fade-in">
          <h2 className="section-title">
            Testimoni Pelanggan
          </h2>
          <p className="section-subtitle">
            Dengarkan pengalaman pelanggan yang telah merasakan manfaat Platform MogiApp
          </p>
        </div>

        {/* Testimonials Grid - Improved spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <Quote className="h-8 w-8 text-primary opacity-50 transition-smooth group-hover:opacity-100 group-hover:scale-110" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400 transition-smooth hover:scale-125" />
                ))}
              </div>

              {/* Content */}
              <p className="body-md text-foreground mb-8 font-medium">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-8">
                <div className="heading-sm text-foreground">{testimonial.name}</div>
                <div className="body-sm text-primary font-medium">{testimonial.role}</div>
                <div className="body-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;