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
      <div className="container-width section-padding">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="text-2xl font-bold text-gradient">MogiApp</span>
            </div>
            <p className="body-md text-muted-foreground mb-8">
              Platform terintegrasi untuk Point of Sale, manajemen operasional, tracking armada, dan digital signature. 
              Satu platform untuk semua kebutuhan bisnis Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 body-sm transition-smooth hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">0800-1234-5678</span>
              </div>
              <div className="flex items-center gap-3 body-sm transition-smooth hover:text-primary">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">info@mogiapp.id</span>
              </div>
              <div className="flex items-center gap-3 body-sm transition-smooth hover:text-primary">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3 body-sm transition-smooth hover:text-primary">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">mogiapp.id</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="heading-sm text-foreground mb-6">Produk</h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-muted-foreground hover:text-primary transition-smooth">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="heading-sm text-foreground mb-6">Solusi</h3>
            <ul className="space-y-4">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-muted-foreground hover:text-primary transition-smooth">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="heading-sm text-foreground mb-6">Dukungan</h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-muted-foreground hover:text-primary transition-smooth">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="heading-sm text-foreground mb-6">Perusahaan</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-muted-foreground hover:text-primary transition-smooth">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Address */}
        <div className="border-t border-border pt-12 mb-12">
          <h3 className="heading-sm text-foreground mb-6">Kantor Pusat</h3>
          <div className="body-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-3">Tendean Square</p>
            <p>Jl. Wolter Monginsidi No. 122-124</p>
            <p>RT 16 RW 02 Kavling No. 20-21 Lantai 3</p>
            <p>Kec. Kebayoran Baru, Kel. Petogogan</p>
            <p>Jakarta Selatan 12170</p>
          </div>
        </div>

        {/* Platform Availability */}
        <div className="border-t border-border pt-12 mb-12">
          <h3 className="heading-sm text-foreground mb-6">Platform Tersedia di:</h3>
          <div className="flex flex-wrap gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-3 body-sm font-medium text-foreground transition-smooth hover:text-primary hover:scale-105">
                <platform.icon className="h-4 w-4 text-primary" />
                {platform.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-2xl font-bold text-gradient">M</span>
            <span className="body-sm text-muted-foreground">
              © 2024 MogiApp. All rights reserved.
            </span>
          </div>
          <div className="flex gap-8 body-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;