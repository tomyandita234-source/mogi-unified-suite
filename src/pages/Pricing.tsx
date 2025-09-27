import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Pricing data for all products
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

  const products = [
    {
      id: 'pos',
      name: 'Mogi POS',
      description: 'Solusi Point of Sale lengkap untuk bisnis ritel dan restoran',
      features: [
        'Transaksi cepat & akurat',
        'Manajemen stok otomatis',
        'Laporan penjualan real-time',
        'Multi-outlet support',
        'Payment gateway terintegrasi'
      ]
    },
    {
      id: 'pay',
      name: 'MogiPay',
      description: 'Payment gateway terintegrasi untuk transaksi digital',
      features: [
        'Multi payment gateway',
        'Keamanan tingkat bank',
        'Real-time transaction',
        'API integration ready',
        'Fraud detection system'
      ]
    },
    {
      id: 'ops',
      name: 'Mogi Ops',
      description: 'Manajemen operasional untuk efisiensi bisnis',
      features: [
        'Real-time project tracking',
        'Team scheduling & assignment',
        'Automated reporting',
        'Performance analytics',
        'Integration dengan Mogi POS'
      ]
    },
    {
      id: 'fleet',
      name: 'Mogi Fleet',
      description: 'Solusi manajemen armada dan tracking kendaraan',
      features: [
        'Real-time GPS tracking',
        'Fuel consumption monitoring',
        'Route optimization',
        'Speed limit alerts',
        'Remote engine control'
      ]
    },
    {
      id: 'sign',
      name: 'MogiSign',
      description: 'Platform tanda tangan elektronik',
      features: [
        'Digital signature verification',
        'Encrypted document storage',
        'Audit trail lengkap',
        'Multi-platform support',
        'Legal compliance'
      ]
    },
    {
      id: 'library',
      name: 'Mogi Library',
      description: 'Sistem manajemen perpustakaan digital',
      features: [
        'Digital catalog management',
        'Member registration system',
        'Book lending & return tracking',
        'Fine calculation automatic',
        'Digital library access'
      ]
    },
    {
      id: 'kampuz',
      name: 'Mogi Kampuz',
      description: 'Platform manajemen kampus terintegrasi',
      features: [
        'Student information system',
        'Academic scheduling',
        'Grade management',
        'Online learning platform',
        'Campus resource booking'
      ]
    },
    {
      id: 'dynamics',
      name: 'Mogi Dynamics',
      description: 'Solusi monitoring & integrasi sistem',
      features: [
        'Real-time system monitoring',
        'API integration hub',
        'Performance analytics',
        'Alert & notification system',
        'Data synchronization'
      ]
    },
    {
      id: 'studio',
      name: 'Mogi Studio',
      description: 'Platform kreasi konten digital',
      features: [
        'Drag & drop editor',
        'Template library',
        'Brand asset management',
        'Collaboration tools',
        'Multi-format export'
      ]
    }
  ];

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

        {/* All Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Semua Produk MogiApp</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Solusi terintegrasi untuk semua kebutuhan bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <a 
                      href={`/product/${product.id}`} 
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Pelajari lebih lanjut →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan yang sering diajukan tentang paket dan harga kami.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Apakah ada biaya setup atau instalasi?",
                  answer: "Tidak, semua paket tidak dikenakan biaya setup atau instalasi tambahan. Proses implementasi sudah termasuk dalam paket yang Anda pilih."
                },
                {
                  question: "Bagaimana proses pembayaran dilakukan?",
                  answer: "Pembayaran dilakukan secara otomatis setiap bulan atau tahun tergantung paket yang Anda pilih. Kami menerima pembayaran melalui transfer bank dan kartu kredit."
                },
                {
                  question: "Apakah bisa upgrade atau downgrade paket?",
                  answer: "Ya, Anda bisa kapan saja mengupgrade atau downgrade paket sesuai kebutuhan bisnis Anda tanpa biaya tambahan."
                },
                {
                  question: "Apakah ada masa percobaan gratis?",
                  answer: "Ya, semua paket kami menyediakan masa percobaan gratis selama 14 hari tanpa perlu kartu kredit."
                },
                {
                  question: "Apakah data saya aman?",
                  answer: "Ya, kami menggunakan enkripsi tingkat enterprise dan mengikuti standar keamanan internasional untuk melindungi data Anda."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-border rounded-xl p-6 bg-background">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;