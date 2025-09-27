import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ArrowRight, ShoppingCart, Settings, Truck, FileSignature, CreditCard, BookOpen, GraduationCap, Activity, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import logos
import mogiPosLogo from '@/assets/mogi-pos-logo.png';
import mogiOpsLogo from '@/assets/mogi-ops-logo.png';
import mogiSignLogo from '@/assets/mogi-sign-logo.png';
import mogiPayLogo from '@/assets/mogi-pay-logo.png';
import mogiLibraryLogo from '@/assets/mogi-library-logo.png';
import mogiKampuzLogo from '@/assets/mogi-kampuz-logo.png';
import mogiDynamicsLogo from '@/assets/mogi-dynamics-logo.png';
import mogiStudioLogo from '@/assets/mogi-studio-logo.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  const products = {
    'pos': {
      id: 'pos',
      name: 'Mogi POS',
      logo: mogiPosLogo,
      subtitle: 'Point of Sale Solution',
      description: 'Kelola transaksi, inventaris, dan laporan penjualan dengan mudah. Interface yang intuitif dan laporan real-time untuk pengambilan keputusan yang tepat.',
      longDescription: 'Mogi POS adalah solusi Point of Sale terlengkap yang dirancang untuk membantu bisnis Anda mengelola transaksi, inventaris, dan laporan penjualan dengan lebih efisien. Dengan antarmuka yang intuitif dan laporan real-time, Anda dapat membuat keputusan bisnis yang lebih tepat dan cepat.',
      features: [
        'Transaksi cepat & akurat',
        'Manajemen stok otomatis',
        'Laporan penjualan real-time',
        'Multi-outlet support',
        'Payment gateway terintegrasi',
        'Integrasi dengan produk Mogi lainnya',
        'Support offline mode',
        'Customizable receipt templates'
      ],
      benefits: [
        'Tingkatkan efisiensi operasional hingga 50%',
        'Kurangi kesalahan manusia dalam transaksi',
        'Pantau performa bisnis secara real-time',
        'Kelola multi-outlet dari satu dashboard'
      ],
      icon: ShoppingCart,
      color: 'from-cyan-500 to-blue-500',
      pricing: {
        basic: 'Rp 299.000/bulan',
        pro: 'Rp 599.000/bulan',
        enterprise: 'Custom'
      }
    },
    'pay': {
      id: 'pay',
      name: 'MogiPay',
      logo: mogiPayLogo,
      subtitle: 'Payment Gateway Solution',
      description: 'Solusi pembayaran digital yang aman dan terintegrasi. Mendukung berbagai metode pembayaran untuk kemudahan transaksi bisnis Anda.',
      longDescription: 'MogiPay menyediakan solusi pembayaran digital yang aman dan terintegrasi dengan sistem POS Anda. Dengan dukungan berbagai metode pembayaran, pelanggan Anda dapat melakukan transaksi dengan cara yang paling nyaman bagi mereka.',
      features: [
        'Multi payment gateway',
        'Keamanan tingkat bank',
        'Real-time transaction',
        'API integration ready',
        'Fraud detection system',
        'Recurring payments',
        'Split payments',
        'Refund management'
      ],
      benefits: [
        'Terima pembayaran dari berbagai channel',
        'Tingkatkan konversi penjualan hingga 30%',
        'Keamanan transaksi yang terjamin',
        'Laporan keuangan otomatis'
      ],
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
      pricing: {
        basic: 'Rp 199.000/bulan',
        pro: 'Rp 399.000/bulan',
        enterprise: 'Custom'
      }
    },
    'ops': {
      id: 'ops',
      name: 'Mogi Ops',
      logo: mogiOpsLogo,
      subtitle: 'Operations Management',
      description: 'Pantau dan kelola operasional bisnis secara menyeluruh. Dari penjadwalan tim hingga monitoring progress dengan dashboard yang komprehensif.',
      longDescription: 'Mogi Ops membantu Anda memantau dan mengelola seluruh operasional bisnis dari satu dashboard terpadu. Dengan fitur penjadwalan tim, monitoring progress, dan laporan otomatis, Anda dapat memastikan semua aspek bisnis berjalan lancar.',
      features: [
        'Real-time project tracking',
        'Team scheduling & assignment',
        'Automated reporting',
        'Performance analytics',
        'Integration dengan Mogi POS',
        'Resource allocation',
        'Task management',
        'Time tracking'
      ],
      benefits: [
        'Tingkatkan produktivitas tim hingga 40%',
        'Pantau progress proyek secara real-time',
        'Kurangi waktu rapat koordinasi',
        'Optimalkan alokasi sumber daya'
      ],
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      pricing: {
        basic: 'Rp 399.000/bulan',
        pro: 'Rp 799.000/bulan',
        enterprise: 'Custom'
      }
    },
    'fleet': {
      id: 'fleet',
      name: 'Mogi Fleet',
      logo: mogiPosLogo,
      subtitle: 'Fleet Management System',
      description: 'Solusi komprehensif untuk tracking dan manajemen kendaraan dengan teknologi GPS terkini. Keamanan dan efisiensi dalam satu platform.',
      longDescription: 'Mogi Fleet adalah solusi manajemen armada yang komprehensif menggunakan teknologi GPS terkini. Pantau lokasi kendaraan secara real-time, optimalkan rute pengiriman, dan kelola seluruh armada Anda dari satu dashboard.',
      features: [
        'Real-time GPS tracking',
        'Fuel consumption monitoring',
        'Route optimization',
        'Speed limit alerts',
        'Remote engine control',
        'Maintenance scheduling',
        'Driver behavior monitoring',
        'Geofencing'
      ],
      benefits: [
        'Kurangi biaya bahan bakar hingga 20%',
        'Tingkatkan efisiensi rute pengiriman',
        'Pantau aktivitas driver secara real-time',
        'Jadwal maintenance otomatis'
      ],
      icon: Truck,
      color: 'from-orange-500 to-red-500',
      pricing: {
        basic: 'Rp 499.000/bulan',
        pro: 'Rp 899.000/bulan',
        enterprise: 'Custom'
      }
    },
    'sign': {
      id: 'sign',
      name: 'MogiSign',
      logo: mogiSignLogo,
      subtitle: 'Digital Signature Platform',
      description: 'Solusi tanda tangan elektronik yang aman dan sah secara hukum. Proses dokumen lebih cepat dengan keamanan tingkat enterprise.',
      longDescription: 'MogiSign menyediakan solusi tanda tangan elektronik yang aman dan sah secara hukum. Mempercepat proses dokumen Anda dengan keamanan tingkat enterprise dan memenuhi standar regulasi yang berlaku.',
      features: [
        'Digital signature verification',
        'Encrypted document storage',
        'Audit trail lengkap',
        'Multi-platform support',
        'Legal compliance',
        'Bulk signing capability',
        'Document templates',
        'Workflow automation'
      ],
      benefits: [
        'Percepat proses dokumen hingga 80%',
        'Hemat biaya cetak dan kirim dokumen',
        'Audit trail yang komprehensif',
        'Kepatuhan terhadap regulasi'
      ],
      icon: FileSignature,
      color: 'from-blue-500 to-indigo-500',
      pricing: {
        basic: 'Rp 249.000/bulan',
        pro: 'Rp 499.000/bulan',
        enterprise: 'Custom'
      }
    },
    'library': {
      id: 'library',
      name: 'Mogi Library',
      logo: mogiLibraryLogo,
      subtitle: 'Library Management System',
      description: 'Sistem manajemen perpustakaan digital yang komprehensif. Kelola koleksi buku, anggota, dan peminjaman dengan mudah dan efisien.',
      longDescription: 'Mogi Library adalah sistem manajemen perpustakaan digital yang komprehensif. Kelola koleksi buku, anggota, dan peminjaman dengan mudah dan efisien melalui antarmuka yang intuitif dan laporan yang detail.',
      features: [
        'Digital catalog management',
        'Member registration system',
        'Book lending & return tracking',
        'Fine calculation automatic',
        'Digital library access',
        'Reading statistics',
        'Reservation system',
        'Multi-branch support'
      ],
      benefits: [
        'Digitalisasi koleksi perpustakaan',
        'Otomatisasi proses peminjaman',
        'Laporan statistik penggunaan',
        'Akses digital untuk anggota'
      ],
      icon: BookOpen,
      color: 'from-teal-500 to-cyan-500',
      pricing: {
        basic: 'Rp 349.000/bulan',
        pro: 'Rp 699.000/bulan',
        enterprise: 'Custom'
      }
    },
    'kampuz': {
      id: 'kampuz',
      name: 'Mogi Kampuz',
      logo: mogiKampuzLogo,
      subtitle: 'Campus Management System',
      description: 'Platform manajemen kampus yang terintegrasi. Solusi lengkap untuk administrasi akademik, mahasiswa, dan operasional kampus.',
      longDescription: 'Mogi Kampuz adalah platform manajemen kampus terintegrasi yang menyediakan solusi lengkap untuk administrasi akademik, manajemen mahasiswa, dan operasional kampus. Tingkatkan efisiensi dan kualitas layanan pendidikan Anda.',
      features: [
        'Student information system',
        'Academic scheduling',
        'Grade management',
        'Online learning platform',
        'Campus resource booking',
        'Parent-student portal',
        'Attendance tracking',
        'Financial management'
      ],
      benefits: [
        'Terpadukan semua sistem administrasi kampus',
        'Tingkatkan efisiensi proses akademik',
        'Komunikasi yang lebih baik dengan orang tua',
        'Laporan akademik otomatis'
      ],
      icon: GraduationCap,
      color: 'from-blue-600 to-purple-600',
      pricing: {
        basic: 'Rp 1.499.000/bulan',
        pro: 'Rp 2.999.000/bulan',
        enterprise: 'Custom'
      }
    },
    'dynamics': {
      id: 'dynamics',
      name: 'Mogi Dynamics',
      logo: mogiDynamicsLogo,
      subtitle: 'Monitoring & Integration Solutions',
      description: 'Solusi monitoring dan integrasi sistem yang powerful. Pantau performa aplikasi dan integrasikan berbagai sistem dengan mudah.',
      longDescription: 'Mogi Dynamics menyediakan solusi monitoring dan integrasi sistem yang powerful. Pantau performa aplikasi Anda secara real-time dan integrasikan berbagai sistem dengan mudah melalui dashboard yang terpadu.',
      features: [
        'Real-time system monitoring',
        'API integration hub',
        'Performance analytics',
        'Alert & notification system',
        'Data synchronization',
        'Custom dashboard builder',
        'SLA monitoring',
        'Incident management'
      ],
      benefits: [
        'Pantau kesehatan sistem secara real-time',
        'Integrasi mudah antar sistem',
        'Notifikasi otomatis saat terjadi masalah',
        'Analisis performa yang komprehensif'
      ],
      icon: Activity,
      color: 'from-pink-500 to-rose-500',
      pricing: {
        basic: 'Rp 599.000/bulan',
        pro: 'Rp 1.199.000/bulan',
        enterprise: 'Custom'
      }
    },
    'studio': {
      id: 'studio',
      name: 'Mogi Studio',
      logo: mogiStudioLogo,
      subtitle: 'Content Creation Platform',
      description: 'Platform kreasi konten digital yang profesional. Tools lengkap untuk membuat, mengedit, dan mengelola konten multimedia bisnis Anda.',
      longDescription: 'Mogi Studio adalah platform kreasi konten digital profesional yang menyediakan tools lengkap untuk membuat, mengedit, dan mengelola konten multimedia bisnis Anda. Tingkatkan kualitas konten dan efisiensi proses kreatif Anda.',
      features: [
        'Drag & drop editor',
        'Template library',
        'Brand asset management',
        'Collaboration tools',
        'Multi-format export',
        'Cloud storage integration',
        'Version control',
        'Approval workflow'
      ],
      benefits: [
        'Percepat proses pembuatan konten',
        'Konsistensi brand yang terjaga',
        'Kolaborasi tim yang efektif',
        'Arsip konten yang terorganisir'
      ],
      icon: Camera,
      color: 'from-violet-500 to-purple-500',
      pricing: {
        basic: 'Rp 399.000/bulan',
        pro: 'Rp 799.000/bulan',
        enterprise: 'Custom'
      }
    }
  };

  useEffect(() => {
    if (productId && products[productId as keyof typeof products]) {
      setProduct(products[productId as keyof typeof products]);
    } else {
      // Redirect to 404 if product not found
      navigate('/404');
    }
  }, [productId, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container-width">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Produk
            </Button>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div>
                  <img 
                    src={product.logo} 
                    alt={`${product.name} Logo`}
                    className="h-48 w-auto"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div>
                  <h1 className="heading-xxl text-foreground mb-4">{product.name}</h1>
                  <p className="heading-md text-primary mb-6">{product.subtitle}</p>
                  <p className="body-lg text-muted-foreground mb-8">
                    {product.longDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button className="btn-primary">
                      Coba Demo Gratis
                    </Button>
                    <Button variant="outline">
                      Hubungi Sales
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/5">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="section-title">Fitur Utama</h2>
              <p className="section-subtitle">
                Solusi lengkap untuk kebutuhan bisnis Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border"
                >
                  <div className={`w-8 h-8 rounded-full ${product.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="body-md text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="section-title">Manfaat Utama</h2>
              <p className="section-subtitle">
                Dampak positif yang akan Anda dapatkan
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.benefits.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-xl border border-border text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="body-md text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/5">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="section-title">Pilihan Paket</h2>
              <p className="section-subtitle">
                Sesuaikan dengan kebutuhan bisnis Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['basic', 'pro', 'enterprise'].map((plan, index) => (
                <div
                  key={plan}
                  className="bg-background rounded-2xl border border-border overflow-hidden"
                >
                  <div className={`h-2 ${product.color}`}></div>
                  <div className="p-8">
                    <h3 className="heading-md mb-2 capitalize">{plan}</h3>
                    <div className="mb-6">
                      <span className="heading-lg text-foreground">{product.pricing[plan as keyof typeof product.pricing]}</span>
                      {plan !== 'enterprise' && <span className="body-sm text-muted-foreground">/bulan</span>}
                    </div>
                    <Button className="w-full mb-6" variant={plan === 'pro' ? 'default' : 'outline'}>
                      {plan === 'enterprise' ? 'Hubungi Kami' : 'Pilih Paket'}
                    </Button>
                    <ul className="space-y-4">
                      {product.features.slice(0, plan === 'basic' ? 4 : plan === 'pro' ? 6 : product.features.length).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="body-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container-width">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="heading-xl text-white mb-4">Siap Meningkatkan Efisiensi Bisnis Anda?</h2>
              <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan bisnis yang telah mempercayai solusi kami untuk mengoptimalkan operasional mereka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary-contrast" size="lg">
                  Mulai Sekarang
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Jadwalkan Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;