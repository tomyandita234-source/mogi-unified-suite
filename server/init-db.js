const { sequelize, User, Blog, Product } = require('./models');
const config = require('./config');

// Connect to MySQL
sequelize.authenticate()
.then(() => {
  console.log('MySQL connected successfully');
  console.log('Database:', config.DB_NAME);
  console.log('Host:', config.DB_HOST);
  console.log('Port:', config.DB_PORT);
  
  // Sync models with database
  return sequelize.sync({ alter: true });
})
.then(() => {
  console.log('Database synchronized');
  // Create a sample admin user
  return createSampleData();
})
.catch(err => {
  console.error('MySQL connection error:', err);
  process.exit(1);
});

async function createSampleData() {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminExists) {
      // Create sample admin user
      const adminUser = await User.create({
        username: 'admin',
        email: 'admin@mogiapp.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      
      console.log('✅ Sample admin user created:');
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    // Check if sample blogs exist
    const blogCount = await Blog.count();
    
    if (blogCount < 3) {
      // Clear existing blogs to ensure we have consistent sample data
      await Blog.destroy({ where: {} });
      
      // Create sample blog posts
      const sampleBlogs = [
        {
          title: 'Welcome to MogiApp',
          slug: 'welcome-to-mogiapp',
          body: 'This is your first blog post. You can edit or delete this post from the admin panel. MogiApp is a comprehensive suite of business solutions designed to help your business grow and succeed in the digital age.',
          createdBy: 'Admin',
          source: 'Morfogenesis Teknologi Indonesia',
          images_alt: 'MogiApp Dashboard Interface',
          images_source: 'Morfogenesis Teknologi Indonesia Creative Team',
          isShow: true
        },
        {
          title: 'Maximizing Efficiency with Mogi POS',
          slug: 'maximizing-efficiency-with-mogi-pos',
          body: 'Learn how Mogi POS can transform your retail business operations. Our point-of-sale system offers real-time inventory management, automated reporting, and seamless payment integration. Discover how businesses like yours have increased efficiency by up to 40% after implementing Mogi POS.',
          createdBy: 'Admin',
          source: 'Morfogenesis Teknologi Indonesia',
          images_alt: 'Mogi POS Interface',
          images_source: 'Morfogenesis Teknologi Indonesia Creative Team',
          isShow: true
        },
        {
          title: 'The Future of Digital Payments',
          slug: 'the-future-of-digital-payments',
          body: 'Digital payment solutions are revolutionizing how businesses operate. With MogiPay, you can accept payments from multiple channels including QR codes, e-wallets, and traditional cards. Explore the benefits of integrated payment solutions and how they can improve your customer experience.',
          createdBy: 'Admin',
          source: 'Morfogenesis Teknologi Indonesia',
          images_alt: 'MogiPay Payment Interface',
          images_source: 'Morfogenesis Teknologi Indonesia Creative Team',
          isShow: true
        }
      ];
      
      for (const blogData of sampleBlogs) {
        const blog = await Blog.create(blogData);
        console.log(`✅ Sample blog post created: ${blog.title}`);
      }
    } else {
      console.log('ℹ️  Sufficient blog posts already exist');
    }
    
    // Check if sample products exist
    const productCount = await Product.count();
    
    if (productCount < 8) {
      // Clear existing products to ensure we have consistent sample data
      await Product.destroy({ where: {} });
      
      // Create sample products
      const sampleProducts = [
        {
          name: 'Mogi POS',
          slug: 'mogi-pos',
          description: 'Sistem Point of Sale terlengkap untuk usaha ritel Anda',
          longDescription: 'Mogi POS adalah solusi point of sale komprehensif yang dirancang untuk membantu bisnis ritel Anda mengelola penjualan, inventaris, dan pelanggan dengan efisien. Dengan antarmuka yang intuitif dan fitur yang kuat, Mogi POS memungkinkan Anda untuk fokus pada pertumbuhan bisnis Anda.',
          category: 'pos',
          features: [
            'Manajemen inventaris real-time',
            'Integrasi pembayaran multi-channel',
            'Laporan penjualan otomatis',
            'Manajemen pelanggan',
            'Integrasi e-commerce'
          ],
          benefits: [
            'Tingkatkan efisiensi operasional',
            'Kurangi kesalahan manusia',
            'Tingkatkan pengalaman pelanggan',
            'Dapatkan wawasan bisnis yang lebih baik'
          ],
          pricing: {
            basic: {
              price: 'Rp 299.000',
              period: '/bulan',
              features: [
                'Hingga 1.000 transaksi/bulan',
                'Manajemen inventaris dasar',
                'Laporan penjualan dasar',
                '1 pengguna'
              ]
            },
            pro: {
              price: 'Rp 599.000',
              period: '/bulan',
              features: [
                'Transaksi tak terbatas',
                'Manajemen inventaris lengkap',
                'Laporan penjualan lanjutan',
                'Hingga 5 pengguna',
                'Integrasi pembayaran'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Transaksi tak terbatas',
                'Fitur kustom',
                'Dukungan prioritas 24/7',
                'Pengguna tak terbatas',
                'Integrasi API'
              ]
            }
          },
          isActive: true,
          sortOrder: 1
        },
        {
          name: 'MogiPay',
          slug: 'mogipay',
          description: 'Solusi pembayaran digital terintegrasi untuk bisnis modern',
          longDescription: 'MogiPay adalah platform pembayaran digital yang memungkinkan bisnis Anda menerima pembayaran dari berbagai channel dengan aman dan efisien. Terintegrasi langsung dengan Mogi POS dan sistem lainnya.',
          category: 'pay',
          features: [
            'Pembayaran QR Code',
            'Integrasi e-wallet',
            'Pembayaran kartu kredit/debit',
            'Manajemen rekening virtual',
            'Settlement otomatis'
          ],
          benefits: [
            'Tingkatkan konversi penjualan',
            'Kurangi biaya transaksi',
            'Tingkatkan kepuasan pelanggan',
            'Pantau transaksi real-time'
          ],
          pricing: {
            basic: {
              price: 'Rp 199.000',
              period: '/bulan',
              features: [
                'Hingga 500 transaksi/bulan',
                'Pembayaran QR Code',
                'Laporan dasar',
                'Biaya transaksi 2.9%'
              ]
            },
            pro: {
              price: 'Rp 399.000',
              period: '/bulan',
              features: [
                'Transaksi tak terbatas',
                'Semua metode pembayaran',
                'Laporan lengkap',
                'Biaya transaksi 2.5%',
                'Integrasi API'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Fitur kustom',
                'Dukungan dedicated',
                'Biaya transaksi negotiable',
                'SLA khusus'
              ]
            }
          },
          isActive: true,
          sortOrder: 2
        },
        {
          name: 'Mogi Ops',
          slug: 'mogi-ops',
          description: 'Platform manajemen operasional terpadu untuk bisnis Anda',
          longDescription: 'Mogi Ops membantu Anda mengelola seluruh operasional bisnis dalam satu platform terpadu. Dari manajemen tugas harian hingga pelaporan kinerja, Mogi Ops memberikan solusi komprehensif untuk meningkatkan produktivitas tim Anda.',
          category: 'ops',
          features: [
            'Manajemen tugas dan proyek',
            'Pelacakan waktu dan produktivitas',
            'Manajemen sumber daya',
            'Laporan kinerja otomatis',
            'Integrasi dengan sistem lain'
          ],
          benefits: [
            'Tingkatkan produktivitas tim',
            'Kurangi waktu manajemen',
            'Tingkatkan akuntabilitas',
            'Dapatkan wawasan operasional'
          ],
          pricing: {
            basic: {
              price: 'Rp 399.000',
              period: '/bulan',
              features: [
                'Hingga 10 pengguna',
                'Manajemen tugas dasar',
                'Laporan mingguan',
                '2 GB penyimpanan'
              ]
            },
            pro: {
              price: 'Rp 799.000',
              period: '/bulan',
              features: [
                'Pengguna tak terbatas',
                'Manajemen proyek lengkap',
                'Laporan real-time',
                '10 GB penyimpanan',
                'Integrasi kalender'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Fitur kustom',
                'Dukungan dedicated',
                'Penyimpanan tak terbatas',
                'API kustom'
              ]
            }
          },
          isActive: true,
          sortOrder: 3
        },
        {
          name: 'Mogi Fleet',
          slug: 'mogi-fleet',
          description: 'Solusi manajemen armada dan logistik terintegrasi',
          longDescription: 'Mogi Fleet memungkinkan Anda untuk mengelola armada kendaraan secara efisien dengan pelacakan real-time, manajemen pengemudi, dan optimasi rute. Solusi ini membantu perusahaan logistik dan transportasi mengurangi biaya operasional sambil meningkatkan layanan pelanggan.',
          category: 'fleet',
          features: [
            'Pelacakan GPS real-time',
            'Manajemen pengemudi',
            'Optimasi rute',
            'Manajemen pemeliharaan',
            'Laporan pengeluaran'
          ],
          benefits: [
            'Kurangi biaya bahan bakar',
            'Tingkatkan efisiensi rute',
            'Tingkatkan keamanan armada',
            'Dapatkan wawasan operasional'
          ],
          pricing: {
            basic: {
              price: 'Rp 499.000',
              period: '/bulan',
              features: [
                'Hingga 5 kendaraan',
                'Pelacakan dasar',
                'Laporan mingguan',
                'Notifikasi dasar'
              ]
            },
            pro: {
              price: 'Rp 999.000',
              period: '/bulan',
              features: [
                'Hingga 20 kendaraan',
                'Pelacakan real-time',
                'Laporan harian',
                'Notifikasi lanjutan',
                'Manajemen pengemudi'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Kendaraan tak terbatas',
                'Fitur kustom',
                'Dukungan 24/7',
                'Integrasi API',
                'Analitik lanjutan'
              ]
            }
          },
          isActive: true,
          sortOrder: 4
        },
        {
          name: 'MogiSign',
          slug: 'mogisign',
          description: 'Platform tanda tangan digital untuk dokumen bisnis',
          longDescription: 'MogiSign menyederhanakan proses penandatanganan dokumen dengan solusi tanda tangan digital yang aman dan mudah digunakan. Kirim, tandatangani, dan simpan dokumen secara digital dalam hitungan menit, sesuai dengan regulasi eIDAS dan UU ITE Indonesia.',
          category: 'sign',
          features: [
            'Tanda tangan digital',
            'Verifikasi identitas',
            'Audit trail',
            'Penyimpanan aman',
            'Integrasi dengan sistem lain'
          ],
          benefits: [
            'Hemat waktu dan biaya',
            'Tingkatkan keamanan dokumen',
            'Akses dari mana saja',
            'Sesuai regulasi'
          ],
          pricing: {
            basic: {
              price: 'Rp 149.000',
              period: '/bulan',
              features: [
                'Hingga 100 dokumen/bulan',
                'Tanda tangan dasar',
                'Penyimpanan 1 GB',
                'Dukungan email'
              ]
            },
            pro: {
              price: 'Rp 299.000',
              period: '/bulan',
              features: [
                'Dokumen tak terbatas',
                'Tanda tangan lanjutan',
                'Penyimpanan 10 GB',
                'Dukungan prioritas',
                'Template kustom'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Fitur kustom',
                'Dukungan dedicated',
                'Penyimpanan tak terbatas',
                'API kustom',
                'Sertifikat digital'
              ]
            }
          },
          isActive: true,
          sortOrder: 5
        },
        {
          name: 'Mogi Library',
          slug: 'mogi-library',
          description: 'Sistem manajemen perpustakaan digital terintegrasi',
          longDescription: 'Mogi Library membantu institusi pendidikan dan perusahaan mengelola koleksi digital mereka dengan mudah. Dari kataloging hingga sirkulasi, sistem ini menyediakan solusi komprehensif untuk manajemen perpustakaan modern.',
          category: 'library',
          features: [
            'Manajemen koleksi digital',
            'Kataloging otomatis',
            'Sirkulasi otomatis',
            'OPAC (Online Public Access Catalog)',
            'Laporan statistik'
          ],
          benefits: [
            'Tingkatkan aksesibilitas koleksi',
            'Kurangi biaya operasional',
            'Tingkatkan efisiensi staf',
            'Dapatkan wawasan penggunaan'
          ],
          pricing: {
            basic: {
              price: 'Rp 249.000',
              period: '/bulan',
              features: [
                'Hingga 5.000 item',
                'Manajemen dasar',
                'Laporan bulanan',
                '2 pengguna admin'
              ]
            },
            pro: {
              price: 'Rp 499.000',
              period: '/bulan',
              features: [
                'Item tak terbatas',
                'Manajemen lengkap',
                'Laporan real-time',
                'Pengguna tak terbatas',
                'Integrasi OPAC'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Fitur kustom',
                'Dukungan dedicated',
                'API kustom',
                'Integrasi ILS',
                'Mobile app'
              ]
            }
          },
          isActive: true,
          sortOrder: 6
        },
        {
          name: 'Mogi Kampuz',
          slug: 'mogi-kampuz',
          description: 'Platform manajemen kampus terpadu untuk institusi pendidikan',
          longDescription: 'Mogi Kampuz menyediakan solusi terpadu untuk manajemen institusi pendidikan, mencakup akademik, keuangan, sarana prasarana, dan kemahasiswaan. Platform ini membantu perguruan tinggi mengelola operasional mereka dengan lebih efisien dan efektif.',
          category: 'kampuz',
          features: [
            'Manajemen akademik',
            'Sistem keuangan',
            'Manajemen mahasiswa',
            'Manajemen pegawai',
            'Laporan akademik'
          ],
          benefits: [
            'Tingkatkan efisiensi administrasi',
            'Tingkatkan kualitas pendidikan',
            'Kurangi biaya operasional',
            'Dapatkan wawasan institusi'
          ],
          pricing: {
            basic: {
              price: 'Rp 999.000',
              period: '/bulan',
              features: [
                'Hingga 500 mahasiswa',
                'Manajemen akademik dasar',
                'Sistem keuangan dasar',
                '3 pengguna admin'
              ]
            },
            pro: {
              price: 'Rp 1.999.000',
              period: '/bulan',
              features: [
                'Hingga 2.000 mahasiswa',
                'Manajemen akademik lengkap',
                'Sistem keuangan lengkap',
                '10 pengguna admin',
                'Mobile app'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Mahasiswa tak terbatas',
                'Fitur kustom',
                'Dukungan dedicated',
                'API kustom',
                'Integrasi SIAK'
              ]
            }
          },
          isActive: true,
          sortOrder: 7
        },
        {
          name: 'Mogi Dynamics',
          slug: 'mogi-dynamics',
          description: 'Solusi CRM dan manajemen hubungan pelanggan terintegrasi',
          longDescription: 'Mogi Dynamics membantu bisnis memahami, mengelola, dan mengembangkan hubungan dengan pelanggan mereka. Dengan fitur CRM lengkap, otomatisasi pemasaran, dan analitik pelanggan, platform ini meningkatkan loyalitas pelanggan dan penjualan.',
          category: 'dynamics',
          features: [
            'Manajemen kontak',
            'Pipeline penjualan',
            'Otomatisasi pemasaran',
            'Analitik pelanggan',
            'Integrasi media sosial'
          ],
          benefits: [
            'Tingkatkan penjualan',
            'Tingkatkan retensi pelanggan',
            'Personalisasi interaksi',
            'Dapatkan wawasan pelanggan'
          ],
          pricing: {
            basic: {
              price: 'Rp 399.000',
              period: '/bulan',
              features: [
                'Hingga 1.000 kontak',
                'Manajemen kontak dasar',
                'Pipeline penjualan',
                'Laporan bulanan',
                '2 pengguna'
              ]
            },
            pro: {
              price: 'Rp 799.000',
              period: '/bulan',
              features: [
                'Kontak tak terbatas',
                'Manajemen lengkap',
                'Otomatisasi pemasaran',
                'Laporan real-time',
                '5 pengguna'
              ]
            },
            enterprise: {
              price: 'Custom',
              period: '',
              features: [
                'Fitur kustom',
                'Dukungan dedicated',
                'API kustom',
                'Integrasi ERP',
                'AI prediktif'
              ]
            }
          },
          isActive: true,
          sortOrder: 8
        }
      ];
      
      for (const productData of sampleProducts) {
        const product = await Product.create(productData);
        console.log(`✅ Sample product created: ${product.name}`);
      }
    } else {
      console.log('ℹ️  Sufficient products already exist');
    }
    
    console.log('\n🎉 Database initialization completed!');
    console.log('You can now start your server with: npm start');
    
    // Close connection
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

console.log('🚀 Initializing MogiApp database...');
console.log(`🔗 Connecting to: mysql://${config.DB_USER}:****@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`);