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
    <section id="testimoni" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Testimoni Pelanggan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dengarkan pengalaman pelanggan yang telah merasakan manfaat Platform MogiApp
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="product-card group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-primary opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed font-medium">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                <div className="text-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;