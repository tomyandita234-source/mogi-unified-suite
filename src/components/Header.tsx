import { useState, useRef, useEffect } from 'react';
import { Menu, X, Home, Package, Lightbulb, DollarSign, BookOpen, Headphones, Building, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import logo from '@/assets/mogi-pos-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Beranda', href: '/', icon: Home },
    { 
      name: 'Produk', 
      href: '#produk', 
      icon: Package,
      subItems: [
        { name: 'Mogi POS', href: '/product/pos' },
        { name: 'MogiPay', href: '/product/pay' },
        { name: 'Mogi Ops', href: '/product/ops' },
        { name: 'Mogi Fleet', href: '/product/fleet' },
        { name: 'MogiSign', href: '/product/sign' },
        { name: 'Mogi Library', href: '/product/library' },
        { name: 'Mogi Kampuz', href: '/product/kampuz' },
        { name: 'Mogi Dynamics', href: '/product/dynamics' },
        { name: 'Mogi Studio', href: '/product/studio' },
      ]
    },
    { name: 'Solusi', href: '#solusi', icon: Lightbulb },
    { name: 'Harga', href: '/pricing', icon: DollarSign },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Dukungan', href: '#dukungan', icon: Headphones },
    { name: 'Tentang', href: '#tentang', icon: Building },
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <nav className="container-width section-padding py-0 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="/">
              <img src={logo} alt="Mogi Logo" className="h-8 w-auto" />
            </a>
            <a href="/" className="text-xl font-bold text-gradient">app</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative" ref={item.subItems ? dropdownRef : null}>
                  {item.subItems ? (
                    <button
                      onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium flex items-center gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="text-foreground hover:text-primary transition-smooth px-3 py-2 text-sm font-medium flex items-center gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </a>
                  )}
                  
                  {/* Product Dropdown */}
                  {item.subItems && isProductDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                          onClick={() => setIsProductDropdownOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button className="btn-primary flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Mulai Gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container-width px-4 py-4 space-y-2 bg-background">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                        className="text-foreground hover:text-primary block px-4 py-3 text-base font-medium transition-smooth rounded-lg hover:bg-accent flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile Product Submenu */}
                      {isProductDropdownOpen && (
                        <div className="pl-8 pr-4 py-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary rounded transition-colors"
                              onClick={() => {
                                setIsProductDropdownOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:text-primary block px-4 py-3 text-base font-medium transition-smooth rounded-lg hover:bg-accent flex items-center gap-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-4 flex gap-2">
                <ThemeToggle />
                <Button className="btn-primary flex-1 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Mulai Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;