import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, Package, ShoppingCart, CreditCard, Settings, Truck, FileSignature, BookOpen, GraduationCap, Activity, Camera } from 'lucide-react';
import { ProductAPI } from '@/lib/api';
import type { Product } from '@/lib/api';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map product categories to icons
  const iconMap: Record<string, React.ComponentType<any>> = {
    pos: ShoppingCart,
    pay: CreditCard,
    ops: Settings,
    fleet: Truck,
    sign: FileSignature,
    library: BookOpen,
    kampuz: GraduationCap,
    dynamics: Activity,
    studio: Camera,
  };

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductAPI.getAll();
        setProducts(response);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pricing data for general packages
  const pricingPlans = [
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? 'Rp 299.000' : 'Rp 2.990.000',
      period: billingCycle === 'monthly' ? '/bulan' : '/tahun',
      description: 'Solusi ideal untuk usaha kecil dan menengah',
      features: [
        'Hingga 5 pengguna',
        'Manajemen inventaris dasar',
        'Laporan penjualan harian',
        'Integrasi 3 payment gateway',
        'Email support',
        'Backup harian',
      ],
      notIncluded: [
        'Multi-outlet',
        'Advanced reporting',
        'API access',
        'Custom integrations',
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 'Rp 799.000' : 'Rp 7.990.000',
      period: billingCycle === 'monthly' ? '/bulan' : '/tahun',
      description: 'Untuk bisnis yang berkembang pesat',
      features: [
        'Hingga 20 pengguna',
        'Manajemen inventaris lengkap',
        'Laporan penjualan real-time',
        'Integrasi 10 payment gateway',
        'Multi-outlet support',
        'API access',
        'Priority support 24/7',
        'Custom reporting',
      ],
      notIncluded: [
        'Dedicated account manager',
        'Custom integrations',
        'On-premise deployment',
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Solusi lengkap untuk perusahaan besar',
      features: [
        'Unlimited pengguna',
        'Manajemen inventaris lengkap',
        'Laporan penjualan real-time',
        'Integrasi unlimited payment gateway',
        'Multi-outlet support',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 premium support',
        'On-premise deployment',
        'Custom training',
      ],
      notIncluded: [],
      popular: false
    }
  ];

  // Product categories with descriptions
  const productCategories = [
    {
      id: 'pos',
      name: 'Mogi POS',
      description: 'Solusi Point of Sale lengkap untuk bisnis ritel dan restoran',
      icon: ShoppingCart
    },
    {
      id: 'pay',
      name: 'MogiPay',
      description: 'Payment gateway terintegrasi untuk transaksi digital',
      icon: CreditCard
    },
    {
      id: 'ops',
      name: 'Mogi Ops',
      description: 'Manajemen operasional untuk efisiensi bisnis',
      icon: Settings
    },
    {
      id: 'fleet',
      name: 'Mogi Fleet',
      description: 'Solusi manajemen armada dan tracking kendaraan',
      icon: Truck
    },
    {
      id: 'sign',
      name: 'MogiSign',
      description: 'Platform tanda tangan elektronik',
      icon: FileSignature
    },
    {
      id: 'library',
      name: 'Mogi Library',
      description: 'Sistem manajemen perpustakaan digital',
      icon: BookOpen
    },
    {
      id: 'kampuz',
      name: 'Mogi Kampuz',
      description: 'Platform manajemen kampus terintegrasi',
      icon: GraduationCap
    },
    {
      id: 'dynamics',
      name: 'Mogi Dynamics',
      description: 'Solusi monitoring & integrasi sistem',
      icon: Activity
    },
    {
      id: 'studio',
      name: 'Mogi Studio',
      description: 'Platform kreasi konten digital',
      icon: Camera
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-foreground">Loading pricing information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Pricing</h1>
              <p className="text-muted-foreground mb-8">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Harga yang Transparan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket sudah termasuk fitur lengkap 
              dan dukungan teknis profesional.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex justify-center items-center gap-4 mb-16">
              <span className={`text-base font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Bulanan
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative rounded-full w-14 h-7 bg-primary transition-colors duration-200 ease-in-out focus:outline-none"
              >
                <span
                  className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center ${
                    billingCycle === 'annual' ? 'transform translate-x-7' : ''
                  }`}
                >
                  {billingCycle === 'annual' && (
                    <span className="text-xs text-primary font-bold">%</span>
                  )}
                </span>
              </button>
              <span className={`text-base font-medium flex items-center gap-2 ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Tahunan
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  Hemat 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={plan.name} 
                  className={`rounded-2xl border p-8 relative ${
                    plan.popular 
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg bg-gradient-to-b from-background to-primary/5' 
                      : 'border-border bg-background'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                      POPULER
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground"> {plan.period}</span>}
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'border border-primary bg-background text-primary hover:bg-primary/10'}`}
                      size="lg"
                    >
                      Mulai Sekarang
                    </Button>
                  </div>
                  
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                    
                    {plan.notIncluded.map((notIncluded, notIncludedIndex) => (
                      <li key={notIncludedIndex} className="flex items-start gap-3 opacity-60">
                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground line-through">{notIncluded}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product-Specific Pricing */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Harga Per Produk</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Harga spesifik untuk setiap produk dalam suite MogiApp
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category) => {
                // Find products in this category
                const categoryProducts = products.filter(p => p.category === category.id);
                
                // Get the icon for this category
                const IconComponent = iconMap[category.id] || Package;
                
                return (
                  <div 
                    key={category.id} 
                    className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                    
                    {categoryProducts.length > 0 ? (
                      <div className="space-y-4">
                        {categoryProducts.map((product) => (
                          <div key={product._id} className="border-t border-border pt-4">
                            <h4 className="font-medium mb-2">{product.name}</h4>
                            {product.pricing ? (
                              <div className="space-y-2">
                                {Object.entries(product.pricing).map(([plan, details]: [string, any]) => (
                                  <div key={plan} className="flex justify-between text-sm">
                                    <span className="capitalize">{plan}:</span>
                                    <span className="font-medium">
                                      {details.price === "Custom" ? "Custom" : `Rp ${details.price}`}
                                      {details.period && <span className="text-muted-foreground"> {details.period}</span>}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Harga custom</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Harga belum tersedia</p>
                    )}
                    
                    <div className="mt-6">
                      <a 
                        href={`/product/${category.id}`} 
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Pelajari lebih lanjut →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Semua Produk MogiApp</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Platform terintegrasi untuk semua kebutuhan bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category) => {
                const IconComponent = iconMap[category.id] || Package;
                return (
                  <div 
                    key={category.id} 
                    className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-all hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                        <a 
                          href={`/product/${category.id}`} 
                          className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                        >
                          Lihat Detail
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
              <p className="text-lg text-muted-foreground">
                Temukan jawaban untuk pertanyaan yang sering diajukan
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Apakah saya bisa mencoba produk sebelum membeli?",
                  answer: "Ya, kami menyediakan versi demo gratis selama 14 hari untuk semua produk. Anda dapat mengakses semua fitur tanpa batasan selama periode percobaan."
                },
                {
                  question: "Bagaimana cara pembayaran dilakukan?",
                  answer: "Kami menerima pembayaran melalui transfer bank, kartu kredit, dan berbagai platform pembayaran digital. Pembayaran dapat dilakukan bulanan atau tahunan dengan diskon 20% untuk pembayaran tahunan."
                },
                {
                  question: "Apakah ada biaya setup atau instalasi?",
                  answer: "Tidak, semua paket kami tidak memiliki biaya setup atau instalasi tersembunyi. Semua biaya sudah termasuk dalam harga yang tercantum."
                },
                {
                  question: "Bagaimana dengan dukungan teknis?",
                  answer: "Semua paket dilengkapi dengan dukungan teknis melalui email dan chat. Paket Professional dan Enterprise mendapatkan dukungan prioritas 24/7."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background rounded-xl border border-border p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Siap Memulai Perjalanan Digital Anda?</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan bisnis yang telah mempercayai solusi kami untuk mengoptimalkan operasional mereka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-white/90" size="lg">
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

export default Pricing;