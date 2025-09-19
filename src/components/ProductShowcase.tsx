import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Settings, Truck, FileSignature, CreditCard, BookOpen, GraduationCap, Activity, Camera } from 'lucide-react';
import mogiPosLogo from '@/assets/mogi-pos-logo.png';
import mogiOpsLogo from '@/assets/mogi-ops-logo.png';
import mogiSignLogo from '@/assets/mogi-sign-logo.png';
import mogiPayLogo from '@/assets/mogi-pay-logo.png';
import mogiLibraryLogo from '@/assets/mogi-library-logo.png';
import mogiKampuzLogo from '@/assets/mogi-kampuz-logo.png';
import mogiDynamicsLogo from '@/assets/mogi-dynamics-logo.png';
import mogiStudioLogo from '@/assets/mogi-studio-logo.png';

const ProductShowcase = () => {
  const products = [
    {
      id: 'pos',
      name: 'Mogi POS',
      logo: mogiPayLogo,
      subtitle: 'Point of Sale Solution',
      description: 'Kelola transaksi, inventaris, dan laporan penjualan dengan mudah. Interface yang intuitif dan laporan real-time untuk pengambilan keputusan yang tepat.',
      features: [
        'Transaksi cepat & akurat',
        'Manajemen stok otomatis',
        'Laporan penjualan real-time',
        'Multi-outlet support',
        'Payment gateway terintegrasi'
      ],
      icon: ShoppingCart,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'pay',
      name: 'MogiPay',
      logo: mogiPayLogo,
      subtitle: 'Payment Gateway Solution',
      description: 'Solusi pembayaran digital yang aman dan terintegrasi. Mendukung berbagai metode pembayaran untuk kemudahan transaksi bisnis Anda.',
      features: [
        'Multi payment gateway',
        'Keamanan tingkat bank',
        'Real-time transaction',
        'API integration ready',
        'Fraud detection system'
      ],
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ops',
      name: 'Mogi Ops',
      logo: mogiOpsLogo,
      subtitle: 'Operations Management',
      description: 'Pantau dan kelola operasional bisnis secara menyeluruh. Dari penjadwalan tim hingga monitoring progress dengan dashboard yang komprehensif.',
      features: [
        'Real-time project tracking',
        'Team scheduling & assignment',
        'Automated reporting',
        'Performance analytics',
        'Integration dengan Mogi POS'
      ],
      icon: Settings,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'fleet',
      name: 'Mogi Fleet',
      logo: mogiPosLogo,
      subtitle: 'Fleet Management System',
      description: 'Solusi komprehensif untuk tracking dan manajemen kendaraan dengan teknologi GPS terkini. Keamanan dan efisiensi dalam satu platform.',
      features: [
        'Real-time GPS tracking',
        'Fuel consumption monitoring',
        'Route optimization',
        'Speed limit alerts',
        'Remote engine control',
        'Maintenance scheduling'
      ],
      icon: Truck,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'sign',
      name: 'MogiSign',
      logo: mogiSignLogo,
      subtitle: 'Digital Signature Platform',
      description: 'Solusi tanda tangan elektronik yang aman dan sah secara hukum. Proses dokumen lebih cepat dengan keamanan tingkat enterprise.',
      features: [
        'Digital signature verification',
        'Encrypted document storage',
        'Audit trail lengkap',
        'Multi-platform support',
        'Legal compliance',
        'Bulk signing capability'
      ],
      icon: FileSignature,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'library',
      name: 'Mogi Library',
      logo: mogiLibraryLogo,
      subtitle: 'Library Management System',
      description: 'Sistem manajemen perpustakaan digital yang komprehensif. Kelola koleksi buku, anggota, dan peminjaman dengan mudah dan efisien.',
      features: [
        'Digital catalog management',
        'Member registration system',
        'Book lending & return tracking',
        'Fine calculation automatic',
        'Digital library access',
        'Reading statistics'
      ],
      icon: BookOpen,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'kampuz',
      name: 'Mogi Kampuz',
      logo: mogiKampuzLogo,
      subtitle: 'Campus Management System',
      description: 'Platform manajemen kampus yang terintegrasi. Solusi lengkap untuk administrasi akademik, mahasiswa, dan operasional kampus.',
      features: [
        'Student information system',
        'Academic scheduling',
        'Grade management',
        'Online learning platform',
        'Campus resource booking',
        'Parent-student portal'
      ],
      icon: GraduationCap,
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'dynamics',
      name: 'Mogi Dynamics',
      logo: mogiDynamicsLogo,
      subtitle: 'Monitoring & Integration Solutions',
      description: 'Solusi monitoring dan integrasi sistem yang powerful. Pantau performa aplikasi dan integrasikan berbagai sistem dengan mudah.',
      features: [
        'Real-time system monitoring',
        'API integration hub',
        'Performance analytics',
        'Alert & notification system',
        'Data synchronization',
        'Custom dashboard builder'
      ],
      icon: Activity,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'studio',
      name: 'Mogi Studio',
      logo: mogiStudioLogo,
      subtitle: 'Content Creation Platform',
      description: 'Platform kreasi konten digital yang profesional. Tools lengkap untuk membuat, mengedit, dan mengelola konten multimedia bisnis Anda.',
      features: [
        'Drag & drop editor',
        'Template library',
        'Brand asset management',
        'Collaboration tools',
        'Multi-format export',
        'Cloud storage integration'
      ],
      icon: Camera,
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="produk" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Produk Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solusi terintegrasi untuk semua kebutuhan bisnis Anda. Dari Point of Sale hingga manajemen armada, 
            semua dalam satu platform.
          </p>
        </div>

        {/* Product Grid - Responsive 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Product Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={product.logo} 
                    alt={`${product.name} Logo`}
                    className="h-16 w-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                  <p className="text-sm font-semibold text-primary">{product.subtitle}</p>
                </div>
              </div>

              {/* Product Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant="outline" 
                className="w-full group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;