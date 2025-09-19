import { Phone, Mail, MessageCircle, Globe, Smartphone, Monitor } from 'lucide-react';

const Footer = () => {
  const productLinks = [
    { name: 'Mogi POS', href: '#pos' },
    { name: 'MogiPay', href: '#pay' },
    { name: 'Mogi Ops', href: '#ops' },
    { name: 'Mogi Fleet', href: '#fleet' },
    { name: 'MogiSign', href: '#sign' },
    { name: 'Mogi Library', href: '#library' },
    { name: 'Mogi Kampuz', href: '#kampuz' },
    { name: 'Mogi Dynamics', href: '#dynamics' },
    { name: 'Mogi Studio', href: '#studio' },
  ];

  const solutionLinks = [
    { name: 'Retail & F&B', href: '#retail' },
    { name: 'Logistics', href: '#logistics' },
    { name: 'Enterprise', href: '#enterprise' },
    { name: 'Small Business', href: '#small-business' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Dokumentasi', href: '#docs' },
    { name: 'Training', href: '#training' },
    { name: 'Status System', href: '#status' },
  ];

  const companyLinks = [
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Karir', href: '#careers' },
    { name: 'Blog', href: '#blog' },
    { name: 'Press Kit', href: '#press' },
  ];

  const platforms = [
    { icon: Smartphone, label: 'Android & iOS' },
    { icon: Globe, label: 'Web Browser' },
    { icon: Monitor, label: 'Desktop' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-bold text-gradient">MogiApp</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Platform terintegrasi untuk Point of Sale, manajemen operasional, tracking armada, dan digital signature. 
              Satu platform untuk semua kebutuhan bisnis Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">0800-1234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">info@mogiapp.id</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">mogiapp.id</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produk</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solusi</h3>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Dukungan</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Address */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Kantor Pusat</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground mb-2">Tendean Square</p>
            <p>Jl. Wolter Monginsidi No. 122-124</p>
            <p>RT 16 RW 02 Kavling No. 20-21 Lantai 3</p>
            <p>Kec. Kebayoran Baru, Kel. Petogogan</p>
            <p>Jakarta Selatan 12170</p>
          </div>
        </div>

        {/* Platform Availability */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Platform Tersedia di:</h3>
          <div className="flex flex-wrap gap-6">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <platform.icon className="h-4 w-4 text-primary" />
                {platform.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-2xl font-bold text-gradient">M</span>
            <span className="text-sm text-muted-foreground">
              © 2024 MogiApp. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-primary transition-smooth">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;